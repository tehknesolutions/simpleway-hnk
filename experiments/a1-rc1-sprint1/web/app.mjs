import { WORLD_1, WORLD_2, campaignLevels, levelsById, worldByLevelId } from '../core/levels.mjs';
import { createPlayerState, awardLevel, recordAttempt, recordHint, getHintCount, penalizeHeart, nextLevelId } from '../core/player-state.mjs';
import { validateDialogue, validateAgainstIntents } from '../core/validator.mjs';
import { LANGUAGE_VERSION, RUNTIME_STATUS } from '../core/registry.mjs';

const STORAGE_KEY='hnk-a1-rc1-sprint1-player';
const app=document.querySelector('#app');
let state=loadState();
let composer=[];
let dialogue=[];

function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    return raw?JSON.parse(raw):createPlayerState();
  }catch{return createPlayerState();}
}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function level(){return levelsById.get(state.currentLevelId)??WORLD_1.levels[0];}
function currentWorld(l=level()){return worldByLevelId.get(l.id)??WORLD_1;}
function worldNumber(w){return w.id===WORLD_1.id?1:2;}
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
        <div class="stats"><span>🔥 ${state.xp} XP</span><span>❤️ ${state.hearts}/5</span><span>${state.completedLevels.length}/16</span></div>
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
          ${finished?`<button class="primary" id="nextBtn">${l.order===8?'Entrar na Forge →':l.order===16?'Ver checkpoint':'Próxima fase →'}</button>`:''}
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
  const persistedHints=getHintCount(state,l.id);
  state=awardLevel(state,l,{perfect:state.hearts===5,hintsUsed:persistedHints,firstTry:attempts===1});
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
  if(l.order===16){
    document.querySelector('#interaction').innerHTML=`<div class="feedback ok"><strong>🏆 WORLD 2 CLEARED</strong><br>Construction Forge completo: Levels 09–16 concluídos.</div>`;
    return;
  }
  const idx=campaignLevels.findIndex(x=>x.id===l.id);
  const next=campaignLevels[idx+1];
  if(next) state.currentLevelId=next.id;
  state.hearts=5;
  composer=[];dialogue=[];
  save();render();
}

render();
