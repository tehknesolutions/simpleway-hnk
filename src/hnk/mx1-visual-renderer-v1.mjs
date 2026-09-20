const SLOTS=Object.freeze({NUCLEUS:{x:500,y:500,scale:.62},PRE1:{x:250,y:500,scale:.42},POST1:{x:750,y:500,scale:.42}});
const LAYOUT=Object.freeze({ROOT:['NUCLEUS'],CV:['PRE1','NUCLEUS'],VC:['NUCLEUS','POST1'],CVC:['PRE1','NUCLEUS','POST1']});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export function compositionPlan(item){
 const slots=LAYOUT[item.profile];if(!slots||slots.length!==item.gIds.length)throw new Error('PROFILE_ARITY_MISMATCH');
 return item.gIds.map((gid,i)=>({gid,role:slots[i],...SLOTS[slots[i]],rotation:0,mirrored:false}));
}
export function renderPlaceholderSvg(item){
 const plan=compositionPlan(item);
 const roots=plan.map(p=>`<g transform="translate(${p.x} ${p.y}) scale(${p.scale})"><rect x="-180" y="-180" width="360" height="360" rx="36" fill="none" stroke="currentColor" stroke-width="18" stroke-dasharray="28 18"/><text x="0" y="22" text-anchor="middle" font-family="system-ui,sans-serif" font-size="96" font-weight="700" fill="currentColor">${esc(p.gid)}</text><text x="0" y="116" text-anchor="middle" font-family="system-ui,sans-serif" font-size="34" fill="currentColor">${esc(p.role)}</text></g>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" role="img" aria-label="${esc(item.mx1Key)} structural placeholder"><title>${esc(item.mx1Key)} — NONCANON PREPRODUCTION</title><rect width="1000" height="1000" fill="white"/><g color="black">${roots}</g><text x="500" y="900" text-anchor="middle" font-family="system-ui,sans-serif" font-size="34">NONCANON · PREPRODUCTION · ${esc(item.profile)}</text><text x="500" y="950" text-anchor="middle" font-family="monospace" font-size="24">${esc(item.mx1Key)}</text></svg>`;
}
export {SLOTS,LAYOUT};