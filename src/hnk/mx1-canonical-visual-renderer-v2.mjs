import {HNK40_SPRITE_SVG,HNK40_VISUAL_CANON_V2} from './hnk40-visual-canon-v2.mjs';
import {compositionPlan} from './mx1-visual-renderer-v1.mjs';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function defs(){const m=HNK40_SPRITE_SVG.match(/<defs>([\s\S]*?)<\/defs>/);if(!m)throw new Error('HNK40_DEFS_MISSING');return m[1];}
export function renderCanonicalMx1Svg(item){
 const plan=compositionPlan(item);
 const roots=plan.map(p=>`<g transform="translate(${p.x} ${p.y}) scale(${p.scale*4}) translate(-50 -50)" color="currentColor"><use href="#${p.gid}"/></g>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" role="img" aria-label="${esc(item.mx1Key)}"><title>${esc(item.mx1Key)} · HNK40 VISUAL-CANON-V2 roots</title><defs>${defs()}</defs><rect width="1000" height="1000" fill="white"/><g color="black">${roots}</g><text x="500" y="930" text-anchor="middle" font-family="monospace" font-size="22">${esc(item.mx1Key)}</text></svg>`;
}
export {HNK40_VISUAL_CANON_V2};