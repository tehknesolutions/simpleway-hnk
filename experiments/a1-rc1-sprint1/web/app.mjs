import { WORLD_1, WORLD_2, WORLD_3, WORLD_4, WORLDS, campaignLevels, levelsById, worldByLevelId } from '../core/levels.mjs';
import { createPlayerState, awardLevel, recordAttempt, recordHint, getHintCount, getAssistanceCount, recordCodexUse, penalizeHeart, nextLevelId } from '../core/player-state.mjs';
import { validateDialogue, validateAgainstIntents, evaluateMission } from '../core/validator.mjs';
import { LANGUAGE_VERSION, RUNTIME_STATUS } from '../core/registry.mjs';

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
    return raw?JSON.parse(raw):createPlayerState();
  }catch{return createPlayerState();}
}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function level(){return levelsById.get(state.currentLevelId)??WORLD_1.levels[0];}
function currentWorld(l=level()){return worldByLevelId.get(l.id)??WORLD_1;}
function worldNumber(w){return Math.max(1,WORLDS.findIndex(x=>x.id===w.id)+1);}
function progressPct(){return Math.round((state.completedLevels.length/campaignLevels.length)*100);}
function escapeHtml(s=''){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function render(){
  const l=level();
  const w=currentWorld(l);
  const finished=state.completedLevels.includes(l.id);
  app.innerHTML=`
    <div class="shell">
      <header class="topbar">
        <div><div class="brand">HNK A1 · ${escapeHtml(w.title.toUpperCase())}</div><small>${escapeHtml(LANGUAGE_VERSION)}</small></div>
        <div class="stats"><span>🔥 ${state.xp} XP</span><span>❤️ ${state.hearts}/5</span><span>${state.completedLevels.length}/31</span></div>
      </header>
      <div class="progress" aria-label="Progresso"><span style="width:${progressPct()}%"></span></div>
      <section class="card">
        <div class="eyebrow">Level ${String(l.order).padStart(2,'0')} · World ${worldNumber(w)}</div>
        <h1 class="title">${escapeHtml(l.title)}</h1>
        <p class="subtitle">${escapeHtml(w.subtitle)}</p>
        ${l.npc?`<div class="npc">${escapeHtml(l.npc)}</div>`:''}
        <div class="prompt">${escapeHtml(l.prompt)}</div>
        <div id="interaction"></div>
        <div id="feedback"></div>
        <div class="hints" id="hints"></div>
        <div class="footer-actions">
          <button class="secondary" id="hintBtn">💡 Dica</button>
          ${finished?`<button class="primary" id="nextBtn">${l.order===8?'Entrar na Forge →':l.order===16?'Entrar no Dungeon →':l.order===24?'Entrar no Open World →':l.order===31?'Ver checkpoint':'Próxima fase →'}</button>`:''}
        </div>
        <div class="governance">Runtime: <strong>${escapeHtml(RUNTIME_STATUS)}</strong>. Conteúdo do A1 Lab não promove automaticamente léxico ou gramática a CANON.</div>
      </section>
    </div>`;
  renderInteraction(l);
  renderHints(l);
  document.querySelector('#hintBtn')?.addEventListener('click',()=>showHint(l));
  document.querySelector('#nextBtn')?.addEventListener('click',()=>goNext(l));
}

function renderInteraction(l){
  const root=document.querySelector('#interaction');
  if(state.completedLevels.includes(l.id)){
    root.innerHTML='<div class="feedback ok">✅ Fase concluída. Skill registrada no estado local.</div>';
    return;
  }
  if(l.mode==='open_world'){
    const mission=evaluateMission(missionUtterances,l.objectives);
    root.innerHTML=`
      <div class="mission-objectives">
        ${l.objectives.map(o=>{
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
      ${codexOpen?`<div class="codex-tray"><div class="codex-note">Abrir o Codex conta como assistência, mas nunca bloqueia a missão.</div><div class="token-tray">${l.tokenTray.map(t=>`<button class="token" data-codex-token="${t}">${t}</button>`).join('')}</div></div>`:''}
    `;
    const input=root.querySelector('#missionInput');
    input?.addEventListener('input',e=>{missionDraft=e.target.value;});
    input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addMissionUtterance(l);}});
    root.querySelector('#addMissionUtterance')?.addEventListener('click',()=>addMissionUtterance(l));
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

function toggleCodex(l){
  if(!codexOpen){
    state=recordCodexUse(state,l.id);
    save();
  }
  codexOpen=!codexOpen;
  render();
}

function addMissionUtterance(l){
  const utterance=missionDraft.trim();
  if(!utterance){
    feedback('Digite uma fala em HNK antes de usar.','info');
    return;
  }
  missionUtterances.push(utterance);
  missionDraft='';
  const mission=evaluateMission(missionUtterances,l.objectives);
  const latest=mission.results.at(-1);
  if(latest?.status==='UNKNOWN_LEXEME'){
    feedback(`🔎 Palavra ainda não reconhecida: ${latest.unknown.join(', ')}.`,'info');
    render();
    return;
  }
  if(latest?.status==='UNMAPPED_CONSTRUCTION'){
    feedback('🧪 UNMAPPED CONSTRUCTION: a tentativa foi registrada sem perda de coração.','info');
    render();
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
  state=recordAttempt(state,l.id,false);
  if(mission.status==='MISSION_PARTIAL'){
    feedback(`🧭 Objetivo parcial. Ainda faltam: ${mission.missing.join(', ')}.`,'info');
  }else{
    feedback('🧭 A fala é válida, mas ainda não resolveu um objetivo obrigatório desta missão.','info');
  }
  render();
}

function answerContrast(l,id){
  const selected=l.choices.find(c=>c.id===id);
  const correct=Boolean(selected?.correct);
  state=recordAttempt(state,l.id,correct);
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
  if(correct) complete(l);
  else fail('💥 Estrutura/ interpretação incorreta. Use o contexto ou uma dica.',1);
}

function answerMapping(l,correct){
  state=recordAttempt(state,l.id,correct);
  if(correct) complete(l);
  else fail('💥 PUMEK e MUNASE foram invertidos. Lembre: MUNASE é resposta negativa independente; não é NE.',.5);
}

function submitBuilder(l){
  const utterance=composer.join(' ');
  const result=validateAgainstIntents(utterance,[l.targetIntent]);
  const correct=result.status==='VALID';
  state=recordAttempt(state,l.id,correct);
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
  save();
  render();
}

function renderHints(l){
  const el=document.querySelector('#hints');
  if(!el)return;
  const used=getHintCount(state,l.id);
  el.innerHTML=l.hints.slice(0,used).map((h,i)=>`<div class="hint-box">💡 Hint ${i+1}: ${escapeHtml(h)}</div>`).join('');
}

function goNext(l){
  if(l.order===31){
    document.querySelector('#interaction').innerHTML=`<div class="feedback ok"><strong>🏆 WORLD 4 CLEARED</strong><br>Open World completo: 31 fases jogáveis. O próximo gate é o Final Boss.</div>`;
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
