import {HNK_CHESed_PACK} from '../../src/language-packs/hnk/chesed-v1.mjs';
import {HNK_CHESED_VISUAL_SURFACES} from '../../src/language-packs/hnk/chesed-learning-surfaces-v1.mjs';
import {HNK_CHESED_MEDIA,unresolvedRequiredMedia} from '../../src/language-packs/hnk/chesed-media-v1.mjs';

const app=document.querySelector('#app');
const lesson=HNK_CHESed_PACK.lessons[0];
let stage=0;
const labels=['Exposição','Compreensão','Percepção','Recuperação','Transferência'];

function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){
 const surface=HNK_CHESED_VISUAL_SURFACES[Math.min(stage,HNK_CHESED_VISUAL_SURFACES.length-1)];
 const media=HNK_CHESED_MEDIA.get(surface.mediaIds[0]);
 const pending=media?.status==='REQUIRED_UNRESOLVED';
 app.innerHTML=`<div class="layout">
 <aside class="sidebar"><div class="logo">SimpleWay<br><b>HNK</b></div><nav><span>⌂ Início</span><span>◫ Jornada</span><span class="active">▣ Lições</span><span>↻ Revisão</span><span>⚑ Missões</span><span>▥ Progresso</span><span>◇ Codex HNK</span><span>⚗ Laboratório</span></nav><blockquote>“Cada palavra é uma ponte entre mundos.”</blockquote></aside>
 <main><header><div>Aprenda HNK. Conecte palavras. Expanda possibilidades.</div><div class="stats">🔥 0 sequência &nbsp; ⭐ 0 XP &nbsp; ❤️ 5</div></header>
 <section class="lesson"><div class="crumb">A1 › Unidade 4 › Chesed › Fusion V2</div>
 <div class="rail">${labels.map((x,i)=>`<div class="${i===stage?'on':''}"><i>${i+1}</i><small>${x}</small></div>`).join('')}</div>
 <div class="grid"><article><div class="eyebrow">MISSÃO GOVERNADA · ${esc(surface.id)}</div><h1>${esc(lesson.title)} — contexto visual</h1><p class="lead">A interface já consome o HNK Language Pack. O conteúdo linguístico continua limitado às superfícies autorizadas.</p>
 <div class="hero ${pending?'pending':''}">${pending?'<div><strong>🖼️ ASSET VISUAL PENDENTE</strong><p>Este espaço não será preenchido com semântica inventada.</p><code>'+esc(media.id)+'</code></div>':'<img src="'+esc(media.src)+'" alt="Contexto pedagógico">'}</div>
 <div class="governed"><strong>Superfícies HNK autorizadas neste pack</strong>${lesson.governedSurfaces.map(x=>`<span>${esc(x.surface)}</span>`).join('')}</div>
 <div class="actions"><button id="prev" ${stage===0?'disabled':''}>← Voltar</button><button id="next" ${stage===4?'disabled':''}>Avançar →</button></div></article>
 <aside class="panel"><h3>Seu progresso</h3><div class="bar"><b style="width:${(stage+1)*20}%"></b></div><p>${stage+1}/5 · ${labels[stage]}</p><hr><h3>💡 Codex</h3><p>Ajuda pedagógica fica separada da tarefa principal. Nenhuma regra universal é inferida desta tela.</p><hr><h3>Gate visual</h3><p><b>${unresolvedRequiredMedia().length}</b> assets obrigatórios ainda não resolvidos.</p></aside></div></section></main></div>`;
 document.querySelector('#prev')?.addEventListener('click',()=>{stage=Math.max(0,stage-1);render()});
 document.querySelector('#next')?.addEventListener('click',()=>{stage=Math.min(4,stage+1);render()});
}
render();
