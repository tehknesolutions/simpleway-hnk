const VOWELS=new Set(['G01','G02','G03','G04','G05','G06','G40']);
const GID_RE=/^G(?:0[1-9]|[12][0-9]|3[0-9]|40)$/;
export function isVowel(g){return VOWELS.has(g)}
export function syllabifyGids(gids,{bridge=false}={}){
 if(bridge)return {status:'BRIDGE_EXCLUDED',syllables:null,reason:'BRIDGE forms do not induce native rules'};
 if(!Array.isArray(gids)||!gids.length)return {status:'INVALID',syllables:null,reason:'empty sequence'};
 if(gids.some(g=>!GID_RE.test(g)))return {status:'INVALID',syllables:null,reason:'invalid G-ID'};
 const nuclei=[];gids.forEach((g,i)=>{if(isVowel(g))nuclei.push(i)});
 if(!nuclei.length)return {status:'UNRESOLVED',syllables:null,reason:'no governed vowel nucleus'};
 const cuts=[];
 for(let n=0;n<nuclei.length-1;n++){
  const left=nuclei[n],right=nuclei[n+1],between=right-left-1;
  if(between===0){cuts.push(right);continue}
  if(between===1){cuts.push(right-1);continue}
  return {status:'UNRESOLVED_CLUSTER',syllables:null,reason:`internal cluster of ${between} consonants remains unresolved`,cluster:gids.slice(left+1,right)};
 }
 const syllables=[];let start=0;
 for(const cut of cuts){syllables.push(gids.slice(start,cut));start=cut}
 syllables.push(gids.slice(start));
 return {status:'GOVERNED_V1',syllables};
}
export function mx1Eligibility(parse){
 if(parse.status!=='GOVERNED_V1')return {eligible:false,profiles:[],reason:parse.reason||parse.status};
 const items=parse.syllables.map(s=>{
  const pattern=s.map(g=>isVowel(g)?'V':'C').join('');
  const profile=pattern==='CV'?'CV':pattern==='VC'?'VC':pattern==='CVC'?'CVC':pattern==='V'?'ROOT_VOWEL':pattern==='C'?'ROOT_CONSONANT':'OTHER';
  return {gids:s,pattern,profile,multiRoot:s.length>1,mx1MultiRootLicensed:['CV','VC','CVC'].includes(profile)&&s.length<=4};
 });
 return {eligible:items.every(x=>x.gids.length<=4),syllables:items};
}
