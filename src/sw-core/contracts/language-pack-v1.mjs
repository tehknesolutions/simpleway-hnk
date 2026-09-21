export const SW_LANGUAGE_PACK_CONTRACT_VERSION='SW-LANGUAGE-PACK-V1';

export function assertLanguagePack(pack){
  if(!pack || typeof pack!=='object') throw new TypeError('Language pack must be an object');
  for(const key of ['id','language','authority','lessons']) if(!pack[key]) throw new Error('Language pack missing '+key);
  if(!Array.isArray(pack.lessons)) throw new TypeError('Language pack lessons must be an array');
  return true;
}

export function freezeLanguagePack(pack){
  assertLanguagePack(pack);
  return Object.freeze({...pack,lessons:Object.freeze([...pack.lessons])});
}
