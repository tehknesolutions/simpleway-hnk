export const BOSS_VERSION = 'HNK-A1-FINAL-BOSS-V1';

export const BOSS_OBJECTIVE_POOL = Object.freeze([
  { id:'BOSS_GREETING', intent:'GREETING', label:'Cumprimentar ao iniciar o encontro', scene:'Você encontra uma pessoa pela primeira vez.', tokens:['VODEMI'] },
  { id:'BOSS_ROUTE_STATION', intent:'REQUEST_ROUTE_STATION', label:'Pedir rota para a estação', scene:'Você precisa descobrir como chegar à estação.', tokens:['DARUVI','KODERA'] },
  { id:'BOSS_NONUNDERSTANDING', intent:'SIGNAL_NONUNDERSTANDING', label:'Avisar que não entendeu', scene:'Uma fala do NPC não foi compreendida.', tokens:['AN','NE','KURAVI'] },
  { id:'BOSS_REPEAT', intent:'REQUEST_REPEAT', label:'Pedir repetição', scene:'Você precisa que o NPC repita a mensagem.', tokens:['REVATI'] },
  { id:'BOSS_WATER', intent:'STATE_WANT_TWO_BOTTLES_WATER', label:'Pedir duas garrafas de água', scene:'Você precisa conseguir duas garrafas de água.', tokens:['AN','MORAKU','HIZEP','KOPERA','SAVETA'] },
  { id:'BOSS_TOMORROW_TRIP', intent:'STATE_TOMORROW_NEED_GO_STATION', label:'Dizer que amanhã precisa ir à estação', scene:'Sua viagem para a estação é amanhã.', tokens:['TAMURI','AN','KORUME','VEMI','LOKANI','KODERA'] },
  { id:'BOSS_LOST_BOOK', intent:'REQUEST_LOCATION_MY_BOOK', label:'Descobrir onde está seu livro', scene:'Seu livro desapareceu.', tokens:['AN','LENU','KAVESO','RUMI','KUVAN','KE'] },
  { id:'BOSS_HOTEL', intent:'STATE_NO_BATHROOM_AT_HOTEL', label:'Expressar que não há banheiro no hotel', scene:'Você descobre um problema no hotel: não há banheiro.', tokens:['NE','HAVORI','TUMERA','RUMI','HAVENU'] },
  { id:'BOSS_IDENTIFY_BOOK', intent:'IDENTIFY_THIS_BOOK', label:'Identificar este livro', scene:'Na loja, você precisa indicar qual livro quer.', tokens:['SEVAI','KAVESO'] },
  { id:'BOSS_TWO_BOOKS', intent:'STATE_WANT_TWO_BOOKS', label:'Pedir dois livros', scene:'Na loja, você precisa de dois livros.', tokens:['AN','MORAKU','HIZEP','KAVESO'] },
  { id:'BOSS_PRICE', intent:'REQUEST_PRICE', label:'Perguntar o preço', scene:'Antes de sair da loja, descubra o preço.', tokens:['KADURI'] },
  { id:'BOSS_THANKS', intent:'THANKS', label:'Agradecer', scene:'Depois de receber ajuda, agradeça.', tokens:['TUMAVI'] }
]);

export function hashSeed(input='') {
  let hash=0x811c9dc5;
  for (const char of String(input)) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash,0x01000193);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let value=seed>>>0;
  return () => {
    value += 0x6D2B79F5;
    let t=value;
    t=Math.imul(t ^ (t>>>15), t|1);
    t^=t + Math.imul(t ^ (t>>>7), t|61);
    return ((t ^ (t>>>14))>>>0)/4294967296;
  };
}

export function makeBossSeed(playerId='PLAYER-QA-LOCAL', sessionId='SESSION-001') {
  return `${BOSS_VERSION}|${playerId}|${sessionId}`;
}

export function generateBossScenario(seedText,{objectiveCount=null,priorityIntents=[]}={}) {
  const seed=hashSeed(seedText);
  const rand=mulberry32(seed);
  const shuffled=[...BOSS_OBJECTIVE_POOL];
  for(let i=shuffled.length-1;i>0;i--){
    const j=Math.floor(rand()*(i+1));
    [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
  }

  const count=Math.max(4,Math.min(6,objectiveCount ?? (4+(seed%3))));
  const priorities=new Set(priorityIntents);
  const prioritized=shuffled.filter(item=>priorities.has(item.intent));
  const remainder=shuffled.filter(item=>!priorities.has(item.intent));
  const selected=[...prioritized,...remainder].slice(0,count);
  const objectives=selected.map(({id,intent,label})=>({id,intent,label}));
  const tokenTray=[...new Set(selected.flatMap(item=>item.tokens))];

  return Object.freeze({
    id:'L32_A1_FINAL_BOSS',
    seed:seedText,
    seedHash:seed.toString(16).padStart(8,'0'),
    objectiveCount:count,
    objectives:Object.freeze(objectives),
    scenes:Object.freeze(selected.map(item=>item.scene)),
    tokenTray:Object.freeze(tokenTray),
    title:'The A1 Final Boss',
    version:BOSS_VERSION
  });
}
