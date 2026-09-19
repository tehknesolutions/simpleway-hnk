import { WORLD_1, WORLD_2, WORLD_3, WORLD_4, FINAL_STAGE, WORLDS, campaignLevels, levelsById, worldByLevelId } from '../core/levels.mjs';
import { createPlayerState, hydratePlayerState, createAnonymousId, beginQaSession, startNewQaSession, markQaSessionComplete, awardLevel, recordAttempt, recordHint, getHintCount, getAssistanceCount, recordCodexUse, hasUsedCodex, penalizeHeart, nextLevelId } from '../core/player-state.mjs';
import { validateDialogue, validateAgainstIntents, evaluateMission, tokenize } from '../core/validator.mjs';
import { LANGUAGE_VERSION, RUNTIME_STATUS, getLexeme } from '../core/registry.mjs';
import { BOSS_VERSION, makeBossSeed, generateBossScenario } from '../core/final-boss.mjs';
import { sanitizeQaTokens, createQaEvent, appendQaEvent, buildQaExport } from '../core/telemetry.mjs';

const STORAGE_KEY='hnk-a1-rc1-sprint1-player';
const app=document.querySelector('#app');
let state=loadState();
let composer=[];
let dialogue=[];
let missionUtterances=[];
let missionDraft='';
let codexOpen=false;

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
function bossScenario(){return generateBossScenario(makeBossSeed(state.playerId,state.qaSessionId));}
function progressPct(){return Math.round((state.completedLevels.length/campaignLevels.length)*100);}
function escapeHtml(s=''){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function renderQaStart(){
  app.innerHTML=`
    <div class="shell">
      <section class="card qa-start">
        <div class="eyebrow">HNK A1 · ALPHA 0.1</div>
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
    state=beginQaSession(state);
    logQaEvent(level(),'SESSION_STARTED',{result:'ACTIVE'});
    save();
    render();
  });
}

function render(){
  if(state.qaSessionStatus==='NEW'){
    renderQaStart();
    return;
  }
  const l=level();
  const w=currentWorld(l);
  const finished=state.completedLevels.includes(l.id);
  app.innerHTML=`
    <div class="shell">
      <header class="topbar">
        <div><div class="brand">HNK A1 · ${escapeHtml(w.title.toUpperCase())}</div><small>${escapeHtml(LANGUAGE_VERSION)}</small></div>
        <div class="stats"><span>🔥 ${state.xp} XP</span><span>❤️ ${state.hearts}/5</span><span>${state.completedLevels.length}/32</span></div>
      </header>
      <div class="session-strip">
        <span>${escapeHtml(state.qaSessionId)}</span>
        <button class="session-reset" id="newQaSessionBtn">🧪 Nova sessão</button>
      </div>
      <div class="progress" aria-label="Progresso"><span style="width:${progressPct()}%"></span></div>
      <section class="card">
        <div class="eyebrow">Level ${String(l.order).padStart(2,'0')} · ${worldLabel(w)}</div>
        <h1 class="title">${escapeHtml(l.title)}</h1>
        <p class="subtitle">${escapeHtml(w.subtitle)}</p>
        ${l.npc?`<div class="npc">${escapeHtml(l.npc)}</div>`:''}
        <div class="prompt">${escapeHtml(l.prompt)}</div>
        <div id="interaction"></div>
        <div id="feedback"></div>
        <div class="hints" id="hints"></div>
        <div class="footer-actions">
          <button class="secondary" id="hintBtn">💡 Dica</button>
          ${finished?`<button class="primary" id="nextBtn">${l.order===8?'Entrar na Forge →':l.order===16?'Entrar no Dungeon →':l.order===24?'Entrar no Open World →':l.order===31?'Enfrentar o Final Boss →':l.order===32?'Exportar Human QA':'Próxima fase →'}</button>`:''}
        </div>
        <div class="governance">Runtime: <strong>${escapeHtml(RUNTIME_STATUS)}</strong>. Conteúdo do A1 Lab não promove automaticamente léxico ou gramática a CANON.</div>
      </section>
    </div>`;
  renderInteraction(l);
  renderHints(l);
  document.querySelector('#hintBtn')?.addEventListener('click',()=>showHint(l));
  document.querySelector('#nextBtn')?.addEventListener('click',()=>goNext(l));
  document.querySelector('#newQaSessionBtn')?.addEventListener('click',()=>{
    const confirmed=window.confirm('Iniciar uma nova sessão QA? O progresso e a telemetria desta rodada serão zerados. Exporte a sessão atual antes, se quiser preservá-la.');
    if(!confirmed)return;
    state=startNewQaSession(state);
    composer=[];dialogue=[];missionUtterances=[];missionDraft='';codexOpen=false;
    logQaEvent(level(),'SESSION_STARTED',{result:'NEW_SESSION'});
    save();
    render();
  });
}

function renderInteraction(l){
  const root=document.querySelector('#interaction');
  if(state.completedLevels.includes(l.id)){
    root.innerHTML='<div class="feedback ok">✅ Fase concluída. Skill registrada no estado local.</div>';
    return;
  }
  if(l.mode==='open_world' || l.mode==='final_boss'){
    const boss=l.mode==='final_boss';
    const scenario=boss?bossScenario():null;
    const objectives=boss?scenario.objectives:l.objectives;
    const tokenTray=boss?scenario.tokenTray:l.tokenTray;
    const mission=evaluateMission(missionUtterances,objectives);
    root.innerHTML=`
      ${boss?`<div class="boss-seed">👹 Seed: <strong>${escapeHtml(scenario.seedHash)}</strong> · ${scenario.objectiveCount} objetivos</div><div class="boss-scenes">${scenario.scenes.map(s=>`<div>• ${escapeHtml(s)}</div>`).join('')}</div>`:''}
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
      ${codexOpen?`<div class="codex-tray"><div class="codex-note">Abrir o Codex conta como assistência, mas nunca bloqueia a missão.</div><div class="token-tray">${tokenTray.map(t=>`<button class="token" data-codex-token="${t}">${t}</button>`).join('')}</div></div>`:''}
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
    root.innerHTML='<div class="choices">'+l.choices.map(c=>`<button class="choice" data-contrast="${c.id}">${escapeHtml(c.label)}</button>`).join('')+'</div>';
    root.querySelectorAll('[data-contrast]').forEach(btn=>btn.addEventListener('click',()=>answerContrast(l,btn.dataset.contrast)));
    return;
  }
  if(l.mode==='choice'){
    root.innerHTML='<div class="choices">'+l.choices.map(c=>`<button class="choice" data-choice="${c.id}">${escapeHtml(c.label)}</button>`).join('')+'</div>';
    root.querySelectorAll('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>answerChoice(l,btn.dataset.choice)));
    return;
  }
  if(l.mode==='mapping'){
    root.innerHTML=`<div class="mapping">
      <button class="map-card" data-map="correct">PUMEK → Sim<br>MUNASE → Não</button>
      <button class="map-card" data-map="wrong">PUMEK → Não<br>MUNASE → Sim</button>
    </div>`;
    root.querySelectorAll('[data-map]').forEach(btn=>btn.addEventListener('click',()=>answerMapping(l,btn.dataset.map==='correct')));
    return;
  }
  if(l.mode==='builder'){
    root.innerHTML=`
      <div class="composer" id="composer">${composer.map(t=>`<span class="token">${escapeHtml(t)}</span>`).join('')}</div>
      <div class="token-tray">${l.tokenTray.map(t=>`<button class="token" data-token="${t}">${t}</button>`).join('')}</div>
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
    root.innerHTML=`
      <div class="utterances" id="utterances">${dialogue.map(u=>`<div class="utterance">${escapeHtml(u)}</div>`).join('')}</div>
      <div class="composer" id="composer">${composer.map(t=>`<span class="token">${escapeHtml(t)}</span>`).join('')}</div>
      <div class="token-tray">${l.tokenTray.map(t=>`<button class="token" data-token="${t}">${t}</button>`).join('')}</div>
      <div class="actions">
        <button class="secondary" id="undoToken">↩ Desfazer token</button>
        <button class="secondary" id="commitUtterance">✓ Fechar fala</button>
        <button class="primary" id="submitDialogue">⚔️ Responder</button>
      </div>`;
    root.querySelectorAll('[data-token]').forEach(btn=>btn.addEventListener('click',()=>{composer.push(btn.dataset.token);render();}));
    root.querySelector('#undoToken')?.addEventListener('click',()=>{composer.pop();render();});
    root.querySelector('#commitUtterance')?.addEventListener('click',()=>{if(composer.length){dialogue.push(composer.join(' '));composer=[];render();}});
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
    seed,
    inputTokens:sanitizeQaTokens(tokenize(input),token=>Boolean(getLexeme(token))),
    result,
    achieved,
    missing,
    hintsUsed:getHintCount(state,l.id),
    codexUsed:hasUsedCodex(state,l.id),
    hearts:state.hearts
  });
  state=appendQaEvent(state,event);
  save();
}

function toggleCodex(l){
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
    feedback('🧪 UNMAPPED CONSTRUCTION: sem perda de coração, mas a tentativa deixa de contar como first-try.','info');
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
  const selected=l.choices.find(c=>c.id===id);
  const correct=Boolean(selected?.correct);
  state=recordAttempt(state,l.id,correct);
  logQaEvent(l,'CHOICE_ATTEMPT',{result:correct?'CORRECT':'INCORRECT'});
  if(correct) complete(l);
  else fail('💥 Estrutura/ interpretação incorreta. Use o contexto ou uma dica.',1);
}

function answerMapping(l,correct){
  state=recordAttempt(state,l.id,correct);
  logQaEvent(l,'MAPPING_ATTEMPT',{result:correct?'CORRECT':'INCORRECT'});
  if(correct) complete(l);
  else fail('💥 PUMEK e MUNASE foram invertidos. Lembre: MUNASE é resposta negativa independente; não é NE.',.5);
}

function submitBuilder(l){
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
  if(composer.length){dialogue.push(composer.join(' '));composer=[];}
  const result=validateDialogue(dialogue,l.requiredIntents);
  const correct=result.status==='VALID';
  state=recordAttempt(state,l.id,correct);
  logQaEvent(l,'DIALOGUE_ATTEMPT',{input:dialogue.join(' '),result:result.status,missing:result.missing});
  if(correct){
    complete(l);
    dialogue=[];
  }else{
    fail(`⚔️ Ainda faltam atos comunicativos: ${result.missing.join(', ')||'estrutura válida'}.`,1);
  }
}

function complete(l){
  const attempts=state.attempts[l.id]?.count??1;
  const assistance=getAssistanceCount(state,l.id);
  state=awardLevel(state,l,{perfect:state.hearts===5,hintsUsed:assistance,firstTry:attempts===1});
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

function downloadQaExport(){
  const payload=buildQaExport(state,{bossVersion:BOSS_VERSION});
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
  if(l.order===32){
    state=markQaSessionComplete(state);
    save();
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
