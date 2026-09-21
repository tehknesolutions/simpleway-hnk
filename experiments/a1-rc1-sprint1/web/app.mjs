import { WORLD_1, WORLD_2, WORLD_3, WORLD_4, FINAL_STAGE, WORLDS, campaignLevels, levelsById, worldByLevelId } from '../core/levels.mjs';
import { createPlayerState, hydratePlayerState, createAnonymousId, beginQaSession, startNewQaSession, markQaSessionComplete, awardLevel, recordAttempt, recordHint, getHintCount, getAssistanceCount, recordCodexUse, hasUsedCodex, penalizeHeart, recordRecallAttempt, beginReview, isReviewActive, completeReview } from '../core/player-state.mjs';
import { validateDialogue, validateAgainstIntents, evaluateMission, tokenize } from '../core/validator.mjs';
import { LANGUAGE_VERSION, RUNTIME_STATUS, getLexeme } from '../core/registry.mjs';
import { BOSS_VERSION, makeBossSeed, generateBossScenario } from '../core/final-boss.mjs';
import { sanitizeQaTokens, createQaEvent, appendQaEvent, buildQaExport } from '../core/telemetry.mjs';
import { ACQUISITION_ENGINE_VERSION, acquisitionStage, presentationPolicy, shuffleSurface, buildCodexCueTray, canUseHelp, getRecallAttemptCount, getDueReviewLevelIds, adaptiveBossProfile } from '../core/acquisition.mjs';
import { deriveL04V2BridgeProgress, routeAfterCampaignLevel, completeL04V2BridgeMission } from '../core/l04-v2-student-flow-router.mjs';

const APP_VERSION='HNK-A1-APP-ALPHA-0.2.1';
const STORAGE_KEY='hnk-a1-rc1-sprint1-player';
const app=document.querySelector('#app');
let state=loadState();
let composer=[];
let dialogue=[];
let missionUtterances=[];
let missionDraft='';
let codexOpen=false;
let bridgeMode=false;

function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    return raw?hydratePlayerState(JSON.parse(raw)):createPlayerState();
  }catch{return createPlayerState();}
}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function level(){return levelsById.get(state.currentLevelId)??WORLD_1.levels[0];}
function currentWorld(l=level()){return worldByLevelId.get(l.id)??WORLD_1;}
function worldNumber(w){return Math.max(1,WORLDS.findIndex(x=>x.id===w.id)+1);}
function worldLabel(w){return w.finalStage?'FINAL BOSS':`World ${worldNumber(w)}`;}
function bossScenario(){
  const profile=adaptiveBossProfile(state,campaignLevels);
  return generateBossScenario(makeBossSeed(state.playerId,state.qaSessionId),{
    objectiveCount:profile.objectiveCount,
    priorityIntents:profile.weakIntents
  });
}
function progressPct(){return Math.round((state.completedLevels.length/campaignLevels.length)*100);}
function sessionVersionWarning(){
  if(state.qaSessionStatus==='NEW' || state.qaSessionStartedAppVersion===APP_VERSION) return '';
  return `<div class="runtime-warning"><strong>⚠ MIXED_RUNTIME</strong> Esta sessão começou em outra versão ou não possui versão inicial verificável. Ela não contará para P01–P07. Use <strong>Nova sessão</strong> para iniciar um teste elegível na ${escapeHtml(APP_VERSION)}.</div>`;
}
function escapeHtml(s=''){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function acquisitionPanel(l){
  const policy=presentationPolicy(l.order);
  const reviewActive=isReviewActive(state,l.id);
  const due=reviewActive?[]:getDueReviewLevelIds(state,campaignLevels,l.order,2);
  const reviewButtons=due.map(id=>{
    const target=levelsById.get(id);
    return target?`<button class="review-chip" data-review-level="${escapeHtml(id)}">↻ ${escapeHtml(target.title)}</button>`:'';
  }).join('');
  return `
    <div class="acquisition-panel">
      <div><strong>🧠 ${escapeHtml(policy.stage)}</strong> · ${escapeHtml(ACQUISITION_ENGINE_VERSION)}</div>
      <small>Opções e trays variam deterministicamente. Ajuda só abre após uma tentativa de recall.</small>
      ${reviewActive
        ? '<div class="review-active">🔁 Revisão espaçada ativa — sem XP extra.</div>'
        : reviewButtons
          ? `<div class="review-row"><span>Revisões devidas:</span>${reviewButtons}</div>`
          : ''}
    </div>`;
}

function renderQaStart(){
  app.innerHTML=`
    <div class="shell">
      <section class="card qa-start">
        <div class="eyebrow">HNK A1 · ALPHA 0.2.1</div>
        <h1 class="title">Human QA Playtest</h1>
        <p class="subtitle">32 desafios. Seus dados ficam locais e usam apenas IDs anônimos.</p>
        <div class="qa-privacy">
          <strong>🔐 Privacidade</strong>
          <p>Não pedimos nome real, endereço ou texto pessoal. Tokens não reconhecidos pelo HNK não entram no export de pesquisa.</p>
        </div>
        <div class="qa-session-meta">
          <span>Player: <strong>${escapeHtml(state.playerId)}</strong></span>
          <span>Session: <strong>${escapeHtml(state.qaSessionId)}</strong></span>
        </div>
        <button class="primary qa-start-button" id="beginQaBtn">▶ Iniciar sessão QA</button>
      </section>
    </div>`;
  document.querySelector('#beginQaBtn')?.addEventListener('click',()=>{
    state=beginQaSession(state,APP_VERSION);
    logQaEvent(level(),'SESSION_STARTED',{result:'ACTIVE'});
    save();
    render();
  });
}

function render(){
  if(bridgeMode){ renderL04V2Bridge(); return; }
  if(state.qaSessionStatus==='NEW'){
    renderQaStart();
    return;
  }
  const l=level();
  const w=currentWorld(l);
  const finished=state.completedLevels.includes(l.id) && !isReviewActive(state,l.id);
  app.innerHTML=`
    <div class="shell">
      <header class="topbar">
        <div><div class="brand">HNK A1 · ${escapeHtml(w.title.toUpperCase())}</div><small>${escapeHtml(LANGUAGE_VERSION)}</small></div>
        <div class="stats"><span>🔥 ${state.xp} XP</span><span>❤️ ${state.hearts}/5</span><span>${state.completedLevels.length}/32</span></div>
      </header>
      <div class="session-strip">
        <span>${escapeHtml(state.qaSessionId)} · ${escapeHtml(APP_VERSION)}</span>
        <div class="session-actions">
          <button class="secondary session-export" id="exportQaBtn">⬇ Exportar sessão</button>
          <button class="session-reset" id="newQaSessionBtn">🧪 Nova sessão</button>
        </div>
      </div>
      ${sessionVersionWarning()}
      <div class="progress" aria-label="Progresso"><span style="width:${progressPct()}%"></span></div>
      <section class="card">
        <div class="eyebrow">Level ${String(l.order).padStart(2,'0')} · ${worldLabel(w)}</div>
        <h1 class="title">${escapeHtml(l.title)}</h1>
        <p class="subtitle">${escapeHtml(w.subtitle)}</p>
        ${acquisitionPanel(l)}
        ${l.npc?`<div class="npc">${escapeHtml(l.npc)}</div>`:''}
        <div class="prompt">${escapeHtml(l.prompt)}</div>
        <div id="interaction"></div>
        <div id="feedback"></div>
        <div class="hints" id="hints"></div>
        <div class="footer-actions">
          <button class="secondary" id="hintBtn">💡 Dica</button>
          ${finished?`<button class="primary" id="nextBtn">${l.order===8?'Entrar na Forge →':l.order===16?(deriveL04V2BridgeProgress(state).status==='COMPLETED'?'Entrar no Dungeon →':'Entrar na Ponte Chesed →'):l.order===24?'Entrar no Open World →':l.order===31?'Enfrentar o Final Boss →':l.order===32?'Exportar Human QA':'Próxima fase →'}</button>`:''}
        </div>
        <div class="governance">Runtime: <strong>${escapeHtml(RUNTIME_STATUS)}</strong>. Conteúdo do A1 Lab não promove automaticamente léxico ou gramática a CANON.</div>
      </section>
    </div>`;
  renderInteraction(l);
  renderHints(l);
  document.querySelectorAll('[data-review-level]').forEach(btn=>btn.addEventListener('click',()=>startSpacedReview(btn.dataset.reviewLevel,l)));
  document.querySelector('#hintBtn')?.addEventListener('click',()=>showHint(l));
  document.querySelector('#nextBtn')?.addEventListener('click',()=>goNext(l));
  document.querySelector('#exportQaBtn')?.addEventListener('click',()=>{
    logQaEvent(l,'SESSION_EXPORT_REQUESTED',{result:state.qaSessionStatus});
    downloadQaExport();
    feedback('⬇ Export Human QA gerado com o progresso atual.','ok');
  });
  document.querySelector('#newQaSessionBtn')?.addEventListener('click',()=>{
    const confirmed=window.confirm('Iniciar uma nova sessão QA? O progresso e a telemetria desta rodada serão zerados. Exporte a sessão atual antes, se quiser preservá-la.');
    if(!confirmed)return;
    state=startNewQaSession(state,APP_VERSION);
    composer=[];dialogue=[];missionUtterances=[];missionDraft='';codexOpen=false;
    logQaEvent(level(),'SESSION_STARTED',{result:'NEW_SESSION'});
    save();
    render();
  });
}


function renderL04V2Bridge(){
  const route=routeAfterCampaignLevel(state,'L16_MY_MOTHER_WORKS');
  if(route.kind==='CAMPAIGN_LEVEL'){ bridgeMode=false; state.currentLevelId=route.levelId; save(); render(); return; }
  const progress=deriveL04V2BridgeProgress(state);
  const mission=route.missions.find(m=>!progress.completedMissionIds.includes(m.id));
  if(!mission){ bridgeMode=false; state.currentLevelId='L17_NE_TRAP'; save(); render(); return; }
  const n=route.missions.findIndex(m=>m.id===mission.id)+1;
  app.innerHTML=`
    <div class="shell"><header class="topbar"><div><div class="brand">HNK A1 · PONTE CHESED</div><small>L04 V2 · conteúdo governado</small></div><div class="stats"><span>🧭 ${n}/5</span><span>${state.completedLevels.length}/32</span></div></header>
    <div class="progress" aria-label="Progresso da ponte"><span style="width:${Math.round(((n-1)/5)*100)}%"></span></div>
    <section class="card"><div class="eyebrow">Ponte intersticial · Missão ${n}/5 · ${escapeHtml(mission.family)}</div><h1 class="title">Chesed V2</h1>
    <p class="subtitle">Observe as formas licenciadas e reconheça também o limite: a forma próxima não é automaticamente válida.</p>
    <div class="npc">${mission.surfaces.map(escapeHtml).join('<br>')}</div>
    <div class="prompt">EXPOSURE → COMPREHENSION → NOTICE → RETRIEVAL → TRANSFER-BOUNDARY</div>
    <div class="choices"><button class="choice" id="bridgeLicensed">✓ Reconheço as formas licenciadas</button><button class="choice" id="bridgeBoundary">🛡️ Rejeito: ${escapeHtml(mission.forbidden)}</button></div>
    <div id="feedback"></div><div class="governance">Esta ponte usa somente a allowlist exata do L04 V2. Não cria níveis nem promove gramática universal.</div></section></div>`;
  let licensed=false,boundary=false;
  const finish=()=>{if(!(licensed&&boundary))return; state=completeL04V2BridgeMission(state,mission.id); save(); const done=deriveL04V2BridgeProgress(state).status==='COMPLETED'; if(done){bridgeMode=false;state.currentLevelId='L17_NE_TRAP';save();} render();};
  document.querySelector('#bridgeLicensed')?.addEventListener('click',()=>{licensed=true;document.querySelector('#bridgeLicensed').disabled=true;finish();});
  document.querySelector('#bridgeBoundary')?.addEventListener('click',()=>{boundary=true;document.querySelector('#bridgeBoundary').disabled=true;finish();});
}

function renderInteraction(l){
  const root=document.querySelector('#interaction');
  if(state.completedLevels.includes(l.id) && !isReviewActive(state,l.id)){
    root.innerHTML='<div class="feedback ok">✅ Fase concluída. Skill registrada no estado local.</div>';
    return;
  }
  if(l.mode==='open_world' || l.mode==='final_boss'){
    const boss=l.mode==='final_boss';
    const scenario=boss?bossScenario():null;
    const objectives=boss?scenario.objectives:l.objectives;
    const tokenTray=boss?scenario.tokenTray:l.tokenTray;
    const codexTokens=buildCodexCueTray(tokenTray,state,l);
    const mission=evaluateMission(missionUtterances,objectives);
    root.innerHTML=`
      ${boss?`<div class="boss-seed">👹 Seed: <strong>${escapeHtml(scenario.seedHash)}</strong> · ${scenario.objectiveCount} objetivos</div><div class="boss-scenes">${scenario.scenes.map(s=>`<div>• ${escapeHtml(s)}</div>`).join('')}</div>`:''}
      <div class="mission-rule"><strong>🧭 Uma fala por envio.</strong> Resolva um objetivo por vez e clique <strong>Usar fala</strong> antes de começar o próximo.</div>
      <div class="mission-objectives">
        ${objectives.map(o=>{
          const achieved=mission.achieved.includes(o.id)||mission.optionalAchieved.includes(o.id);
          const optional=o.required===false?' · bônus':'';
          return `<div class="mission-objective ${achieved?'done':''}"><span>${achieved?'✅':'⬜'}</span><span>${escapeHtml(o.label)}${optional}</span></div>`;
        }).join('')}
      </div>
      <div class="utterances">
        ${mission.results.map(r=>`<div class="utterance mission-line"><span>${escapeHtml(r.utterance)}</span><small>${escapeHtml(r.status)}</small></div>`).join('')}
      </div>
      <label class="mission-input-label" for="missionInput">Sua fala em HNK</label>
      <input id="missionInput" class="mission-input" autocomplete="off" spellcheck="false" value="${escapeHtml(missionDraft)}" placeholder="Digite uma fala..." />
      <div class="actions">
        <button class="primary" id="addMissionUtterance">🗣️ Usar fala</button>
        <button class="secondary" id="undoMissionUtterance">↩ Remover última</button>
        <button class="secondary" id="codexToggle">📖 ${codexOpen?'Fechar':'Abrir'} Codex</button>
      </div>
      ${codexOpen?`<div class="codex-tray"><div class="codex-note">Codex de aquisição: pistas parciais, nunca a bandeja completa da resposta. Abrir conta como assistência.</div><div class="token-tray">${codexTokens.map(t=>`<button class="token" data-codex-token="${t}">${t}</button>`).join('')}</div></div>`:''}
    `;
    const input=root.querySelector('#missionInput');
    input?.addEventListener('input',e=>{missionDraft=e.target.value;});
    input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addMissionUtterance(l,objectives,scenario);}});
    root.querySelector('#addMissionUtterance')?.addEventListener('click',()=>addMissionUtterance(l,objectives,scenario));
    root.querySelector('#undoMissionUtterance')?.addEventListener('click',()=>{missionUtterances.pop();render();});
    root.querySelector('#codexToggle')?.addEventListener('click',()=>toggleCodex(l));
    root.querySelectorAll('[data-codex-token]').forEach(btn=>btn.addEventListener('click',()=>{
      missionDraft=(missionDraft+' '+btn.dataset.codexToken).trim();
      render();
      queueMicrotask(()=>document.querySelector('#missionInput')?.focus());
    }));
    return;
  }
  if(l.mode==='contrast'){
    const choices=shuffleSurface(l.choices,state,l.id,'CONTRAST_CHOICES');
    root.innerHTML='<div class="choices">'+choices.map(c=>`<button class="choice" data-contrast="${c.id}">${escapeHtml(c.label)}</button>`).join('')+'</div>';
    root.querySelectorAll('[data-contrast]').forEach(btn=>btn.addEventListener('click',()=>answerContrast(l,btn.dataset.contrast)));
    return;
  }
  if(l.mode==='choice'){
    const choices=shuffleSurface(l.choices,state,l.id,'CHOICES');
    root.innerHTML='<div class="choices">'+choices.map(c=>`<button class="choice" data-choice="${c.id}">${escapeHtml(c.label)}</button>`).join('')+'</div>';
    root.querySelectorAll('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>answerChoice(l,btn.dataset.choice)));
    return;
  }
  if(l.mode==='mapping'){
    const mappingChoices=shuffleSurface([
      {id:'correct',label:'PUMEK → Sim<br>MUNASE → Não'},
      {id:'wrong',label:'PUMEK → Não<br>MUNASE → Sim'}
    ],state,l.id,'MAPPING_CHOICES');
    root.innerHTML='<div class="mapping">'+mappingChoices.map(c=>`<button class="map-card" data-map="${c.id}">${c.label}</button>`).join('')+'</div>';
    root.querySelectorAll('[data-map]').forEach(btn=>btn.addEventListener('click',()=>answerMapping(l,btn.dataset.map==='correct')));
    return;
  }
  if(l.mode==='builder'){
    const tray=shuffleSurface(l.tokenTray,state,l.id,'BUILDER_TRAY');
    root.innerHTML=`
      <div class="composer" id="composer">${composer.map(t=>`<span class="token">${escapeHtml(t)}</span>`).join('')}</div>
      <div class="token-tray">${tray.map(t=>`<button class="token" data-token="${t}">${t}</button>`).join('')}</div>
      <div class="actions">
        <button class="secondary" id="undoToken">↩ Desfazer</button>
        <button class="secondary" id="clearTokens">Limpar</button>
        <button class="primary" id="submitBuilder">⚒️ Forjar frase</button>
      </div>`;
    root.querySelectorAll('[data-token]').forEach(btn=>btn.addEventListener('click',()=>{composer.push(btn.dataset.token);render();}));
    root.querySelector('#undoToken')?.addEventListener('click',()=>{composer.pop();render();});
    root.querySelector('#clearTokens')?.addEventListener('click',()=>{composer=[];render();});
    root.querySelector('#submitBuilder')?.addEventListener('click',()=>submitBuilder(l));
    return;
  }
  if(l.mode==='dialogue'){
    const tray=shuffleSurface(l.tokenTray,state,l.id,'DIALOGUE_TRAY');
    root.innerHTML=`
      <div class="utterances" id="utterances">${dialogue.map(u=>`<div class="utterance">${escapeHtml(u)}</div>`).join('')}</div>
      <div class="composer" id="composer">${composer.map(t=>`<span class="token">${escapeHtml(t)}</span>`).join('')}</div>
      <div class="token-tray">${tray.map(t=>`<button class="token" data-token="${t}">${t}</button>`).join('')}</div>
      <div class="actions">
        <button class="secondary" id="undoToken">↩ Desfazer token</button>
        <button class="secondary" id="commitUtterance">✓ Fechar fala</button>
        <button class="secondary" id="undoDialogueUtterance">↩ Remover última fala</button>
        <button class="secondary" id="clearDialogue">Limpar falas</button>
        <button class="primary" id="submitDialogue">⚔️ Responder</button>
      </div>`;
    root.querySelectorAll('[data-token]').forEach(btn=>btn.addEventListener('click',()=>{composer.push(btn.dataset.token);render();}));
    root.querySelector('#undoToken')?.addEventListener('click',()=>{composer.pop();render();});
    root.querySelector('#commitUtterance')?.addEventListener('click',()=>{if(composer.length){dialogue.push(composer.join(' '));composer=[];render();}});
    root.querySelector('#undoDialogueUtterance')?.addEventListener('click',()=>{dialogue.pop();render();});
    root.querySelector('#clearDialogue')?.addEventListener('click',()=>{dialogue=[];composer=[];render();});
    root.querySelector('#submitDialogue')?.addEventListener('click',()=>submitDialogue(l));
  }
}

function logQaEvent(l,type,{input='',result=null,achieved=[],missing=[],seed=null}={}){
  const event=createQaEvent({
    eventId:createAnonymousId('EVT'),
    sessionId:state.qaSessionId,
    playerId:state.playerId,
    levelId:l.id,
    type,
    timestamp:new Date().toISOString(),
    runtimeAppVersion:APP_VERSION,
    seed,
    inputTokens:sanitizeQaTokens(tokenize(input),token=>Boolean(getLexeme(token))),
    result,
    achieved,
    missing,
    hintsUsed:getHintCount(state,l.id),
    codexUsed:hasUsedCodex(state,l.id),
    hearts:state.hearts,
    acquisition:{
      stage:acquisitionStage(l.order),
      recallAttempts:getRecallAttemptCount(state,l.id),
      reviewActive:isReviewActive(state,l.id),
      dueReviewLevelIds:getDueReviewLevelIds(state,campaignLevels,l.order,2)
    }
  });
  state=appendQaEvent(state,event);
  save();
}

function toggleCodex(l){
  if(!codexOpen && !canUseHelp(state,l.id)){
    logQaEvent(l,'HELP_BLOCKED_RECALL_REQUIRED',{result:'CODEX'});
    feedback('🧠 Primeiro tente lembrar e responder por conta própria. Depois o Codex libera pistas parciais.','info');
    return;
  }
  if(!codexOpen){
    state=recordCodexUse(state,l.id);
    logQaEvent(l,'CODEX_OPENED',{seed:l.mode==='final_boss'?bossScenario().seedHash:null});
    save();
  }
  codexOpen=!codexOpen;
  render();
}

function addMissionUtterance(l,objectives=l.objectives,scenario=null){
  const utterance=missionDraft.trim();
  if(!utterance){
    feedback('Digite uma fala em HNK antes de usar.','info');
    return;
  }
  state=recordRecallAttempt(state,l.id);
  missionUtterances.push(utterance);
  missionDraft='';
  const mission=evaluateMission(missionUtterances,objectives);
  const latest=mission.results.at(-1);
  logQaEvent(l,'MISSION_UTTERANCE',{
    input:utterance,
    result:latest?.status??mission.status,
    achieved:mission.achieved,
    missing:mission.missing,
    seed:scenario?.seedHash??null
  });
  if(latest?.status==='UNKNOWN_LEXEME'){
    state=recordAttempt(state,l.id,false);
    state=penalizeHeart(state,.5);
    save();
    render();
    feedback(`🔎 Palavra ainda não reconhecida: ${latest.unknown.join(', ')}. −½ ❤️`,'info');
    return;
  }
  if(latest?.status==='UNMAPPED_CONSTRUCTION'){
    state=recordAttempt(state,l.id,false);
    save();
    render();
    feedback('🧪 UNMAPPED CONSTRUCTION: sem perda de coração. Se você juntou dois objetivos, separe-os: uma construção por fala e um clique em “Usar fala” para cada envio.','info');
    return;
  }
  if(mission.status==='MISSION_COMPLETE'){
    state=recordAttempt(state,l.id,true);
    complete(l);
    missionUtterances=[];
    missionDraft='';
    codexOpen=false;
    return;
  }
  render();
  if(mission.status==='MISSION_PARTIAL'){
    feedback(`🧭 Objetivo parcial. Ainda faltam: ${mission.missing.join(', ')}.`,'info');
  }else{
    feedback('🧭 A fala é válida, mas ainda não resolveu um objetivo obrigatório desta missão.','info');
  }
}

function answerContrast(l,id){
  state=recordRecallAttempt(state,l.id);
  const selected=l.choices.find(c=>c.id===id);
  const correct=Boolean(selected?.correct);
  state=recordAttempt(state,l.id,correct);
  logQaEvent(l,'CONTRAST_ATTEMPT',{result:correct?'CORRECT':'INCORRECT'});
  if(correct){
    complete(l);
  }else{
    fail(selected?.feedback||'💥 Armadilha gramatical ativada.',1);
  }
}

function answerChoice(l,id){
  state=recordRecallAttempt(state,l.id);
  const selected=l.choices.find(c=>c.id===id);
  const correct=Boolean(selected?.correct);
  state=recordAttempt(state,l.id,correct);
  logQaEvent(l,'CHOICE_ATTEMPT',{result:correct?'CORRECT':'INCORRECT'});
  if(correct) complete(l);
  else fail('💥 Estrutura/ interpretação incorreta. Use o contexto ou uma dica.',1);
}

function answerMapping(l,correct){
  state=recordRecallAttempt(state,l.id);
  state=recordAttempt(state,l.id,correct);
  logQaEvent(l,'MAPPING_ATTEMPT',{result:correct?'CORRECT':'INCORRECT'});
  if(correct) complete(l);
  else fail('💥 PUMEK e MUNASE foram invertidos. Lembre: MUNASE é resposta negativa independente; não é NE.',.5);
}

function submitBuilder(l){
  state=recordRecallAttempt(state,l.id);
  const utterance=composer.join(' ');
  const result=validateAgainstIntents(utterance,[l.targetIntent]);
  const correct=result.status==='VALID';
  state=recordAttempt(state,l.id,correct);
  logQaEvent(l,'BUILDER_ATTEMPT',{input:utterance,result:result.status});
  if(correct){
    composer=[];
    complete(l);
    return;
  }
  let message='💥 Estrutura ainda não corresponde ao frame desta fase.';
  if(l.id==='L13_THE_MISSING_LINK' && !composer.includes('VEMI')){
    message='🔒 MISSING LINK: duas ações precisam da ponte VEMI neste frame.';
  } else if(result.status==='VALID_WRONG_INTENT'){
    message='🧭 A frase é licenciada em outro frame, mas não resolve esta missão.';
  } else if(result.status==='UNMAPPED_CONSTRUCTION'){
    message='🧪 Combinação não mapeada no HNK A1 RC1. Reorganize os blocos.';
  }
  fail(message,1);
}

function submitDialogue(l){
  state=recordRecallAttempt(state,l.id);
  if(composer.length){dialogue.push(composer.join(' '));composer=[];}
  const result=validateDialogue(dialogue,l.requiredIntents);
  const correct=result.status==='VALID';
  state=recordAttempt(state,l.id,correct);
  logQaEvent(l,'DIALOGUE_ATTEMPT',{input:dialogue.join(' '),result:result.status,missing:result.missing});
  if(correct){
    complete(l);
    dialogue=[];
  }else{
    const hasUnmapped=result.results.some(r=>r.status==='UNMAPPED_CONSTRUCTION');
    const message=hasUnmapped
      ? '🧭 Cada ato precisa ser uma fala separada. Use “Fechar fala” entre os atos; você também pode remover ou limpar falas.'
      : `⚔️ Ainda faltam atos comunicativos: ${result.missing.join(', ')||'ordem dos atos'}.`;
    fail(message,1);
  }
}

function complete(l){
  if(isReviewActive(state,l.id)){
    const returnLevel=levelsById.get(state.acquisition?.reviewReturnLevelId);
    const reviewAtOrder=returnLevel?.order ?? l.order;
    logQaEvent(l,'SPACED_REVIEW_COMPLETE',{result:'COMPLETE'});
    state=completeReview(state,l.id,reviewAtOrder);
    composer=[];dialogue=[];missionUtterances=[];missionDraft='';codexOpen=false;
    save();
    feedback('🔁 Revisão concluída. Retornando à missão atual.','ok');
    setTimeout(render,300);
    return;
  }
  const attempts=state.attempts[l.id]?.count??1;
  const assistance=getAssistanceCount(state,l.id);
  state=awardLevel(state,l,{perfect:state.hearts===5,hintsUsed:assistance,firstTry:attempts===1});
  if(l.order===32) state=markQaSessionComplete(state);
  logQaEvent(l,'LEVEL_COMPLETE',{result:'COMPLETE',seed:l.mode==='final_boss'?bossScenario().seedHash:null});
  save();
  feedback('✅ CLEAR! Skill desbloqueada e XP registrado.','ok');
  setTimeout(render,300);
}

function fail(message,penalty){
  state=penalizeHeart(state,penalty);
  if(state.hearts<=0) state.hearts=5;
  save();
  feedback(message,'bad');
  setTimeout(render,450);
}

function feedback(message,type='info'){
  const el=document.querySelector('#feedback');
  if(el) el.innerHTML=`<div class="feedback ${type}">${escapeHtml(message)}</div>`;
}

function showHint(l){
  if(!canUseHelp(state,l.id)){
    logQaEvent(l,'HELP_BLOCKED_RECALL_REQUIRED',{result:'HINT'});
    feedback('🧠 Faça uma tentativa de recall antes de abrir a primeira dica.','info');
    return;
  }
  const used=getHintCount(state,l.id);
  if(used>=l.hints.length)return;
  state=recordHint(state,l.id);
  logQaEvent(l,'HINT_USED',{result:`HINT_${getHintCount(state,l.id)}`,seed:l.mode==='final_boss'?bossScenario().seedHash:null});
  save();
  render();
}

function renderHints(l){
  const el=document.querySelector('#hints');
  if(!el)return;
  const used=getHintCount(state,l.id);
  el.innerHTML=l.hints.slice(0,used).map((h,i)=>`<div class="hint-box">💡 Hint ${i+1}: ${escapeHtml(h)}</div>`).join('');
}

function startSpacedReview(levelId,returnLevel){
  const target=levelsById.get(levelId);
  if(!target)return;
  state=beginReview(state,levelId,returnLevel.id);
  composer=[];dialogue=[];missionUtterances=[];missionDraft='';codexOpen=false;
  logQaEvent(target,'SPACED_REVIEW_STARTED',{result:`RETURN_${returnLevel.id}`});
  save();
  render();
}

function downloadQaExport(){
  const payload=buildQaExport(state,{appVersion:APP_VERSION,bossVersion:BOSS_VERSION});
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`hnk-a1-qa-${state.qaSessionId}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function goNext(l){
  if(l.id==='L16_MY_MOTHER_WORKS'){
    const route=routeAfterCampaignLevel(state,l.id);
    if(route.kind==='L04_V2_BRIDGE'){ bridgeMode=true; save(); render(); return; }
    if(route.kind==='CAMPAIGN_LEVEL'){ state.currentLevelId=route.levelId; state.hearts=5; save(); render(); return; }
  }
  if(l.order===32){
    downloadQaExport();
    document.querySelector('#interaction').innerHTML=`<div class="feedback ok"><strong>🏆 A1 SURVIVOR</strong><br>32/32 concluídos. Export Human QA gerado para esta sessão anônima.</div>`;
    return;
  }
  const idx=campaignLevels.findIndex(x=>x.id===l.id);
  const next=campaignLevels[idx+1];
  if(next) state.currentLevelId=next.id;
  state.hearts=5;
  composer=[];dialogue=[];missionUtterances=[];missionDraft='';codexOpen=false;
  save();render();
}

render();
