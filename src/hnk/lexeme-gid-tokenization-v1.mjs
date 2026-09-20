const SAFE=Object.freeze({TS:'G30',A:'G01',E:'G02',I:'G03',O:'G04',U:'G05',H:'G07',M:'G11',N:'G12',L:'G14',R:'G15',B:'G18',D:'G19',P:'G21',T:'G22',K:'G23',S:'G26',V:'G31',Z:'G32',Y:'G40'});
const TOKENS=Object.keys(SAFE).sort((a,b)=>b.length-a.length);
export function tokenizeSafeRomanization(form){
 if(typeof form!=='string'||!form)return {status:'INVALID',gIds:null,reason:'form must be non-empty string'};
 if(form==='HNK')return {status:'NON_LEXICAL_CONTENT_TOKEN',gIds:null,reason:'HNK is not tokenized by spelling inference'};
 let i=0;const gIds=[],tokens=[];
 while(i<form.length){
  const tok=TOKENS.find(t=>form.startsWith(t,i));
  if(!tok)return {status:'UNRESOLVED_ROMANIZATION',gIds:null,tokens:null,reason:`No governed safe token at offset ${i}`};
  tokens.push(tok);gIds.push(SAFE[tok]);i+=tok.length;
 }
 return {status:'RESOLVED',tokens,gIds};
}
export const SAFE_ROMANIZATION_TO_GID=SAFE;
