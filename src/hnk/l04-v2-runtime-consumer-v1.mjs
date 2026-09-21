import manifest from '../../curriculum/cycle-01/L04-chesed/runtime/l04-v2-runtime-manifest.v1.json' with { type: 'json' };

export const L04_V2_RUNTIME_ID = 'SWHNK-L04-CHESED-V2-RUNTIME-CONSUMER-V1';
export const L04_V2_EXACT_SURFACES = Object.freeze(manifest.structures.flatMap((s) => s.surfaces));
const allowlist = new Set(L04_V2_EXACT_SURFACES);

if (!manifest.runtimeActive || manifest.status !== 'V2_RUNTIME_ACTIVE_ALLOWLIST_ONLY') {
  throw new Error('L04 V2 runtime manifest is not active');
}
if (L04_V2_EXACT_SURFACES.length !== 8 || allowlist.size !== 8) {
  throw new Error('L04 V2 runtime must expose exactly eight unique surfaces');
}

export function isL04V2RuntimeSurface(surface) {
  return typeof surface === 'string' && allowlist.has(surface);
}

export function getL04V2RuntimeSurface(surface) {
  if (!isL04V2RuntimeSurface(surface)) return null;
  const structure = manifest.structures.find((s) => s.surfaces.includes(surface));
  return Object.freeze({
    surface,
    structureId: structure.id,
    exposureModel: manifest.exposureModel,
    runtimeStatus: manifest.status
  });
}
