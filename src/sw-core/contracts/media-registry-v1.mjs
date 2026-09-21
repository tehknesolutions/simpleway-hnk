export const SW_MEDIA_REGISTRY_VERSION='SW-MEDIA-REGISTRY-V1';
export const MEDIA_KINDS=Object.freeze(['IMAGE','AUDIO','VOICE','VIDEO']);

export function defineMediaAsset(asset){
  for(const key of ['id','kind','src','pedagogicalRole']) if(!asset?.[key]) throw new Error('Media asset missing '+key);
  if(!MEDIA_KINDS.includes(asset.kind)) throw new Error('Unsupported media kind: '+asset.kind);
  return Object.freeze({...asset});
}

export function createMediaRegistry(assets=[]){
  const map=new Map();
  for(const raw of assets){
    const asset=defineMediaAsset(raw);
    if(map.has(asset.id)) throw new Error('Duplicate media asset: '+asset.id);
    map.set(asset.id,asset);
  }
  return Object.freeze({
    version:SW_MEDIA_REGISTRY_VERSION,
    get:(id)=>map.get(id)??null,
    has:(id)=>map.has(id),
    list:()=>Object.freeze([...map.values()])
  });
}
