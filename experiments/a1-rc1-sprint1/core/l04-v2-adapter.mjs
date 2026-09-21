import {
  L04_V2_RUNTIME_ID,
  L04_V2_EXACT_SURFACES,
  isL04V2RuntimeSurface,
  getL04V2RuntimeSurface
} from '../../../src/hnk/l04-v2-runtime-consumer-v1.mjs';

export const L04_V2_A1_ADAPTER_ID = 'SWHNK-L04-CHESED-V2-A1-LOADER-ADAPTER-V1';
export const L04_V2_A1_ADAPTER_ENABLED = false;
export const L04_V2_A1_ADAPTER_SCOPE = 'L04_V2_EXACT_EIGHT_SURFACES_ONLY';

export function getL04V2A1AdapterState() {
  return Object.freeze({
    id: L04_V2_A1_ADAPTER_ID,
    enabled: L04_V2_A1_ADAPTER_ENABLED,
    scope: L04_V2_A1_ADAPTER_SCOPE,
    sourceRuntimeId: L04_V2_RUNTIME_ID,
    surfaceCount: L04_V2_EXACT_SURFACES.length
  });
}

export function resolveL04V2A1Surface(surface, { enabled = L04_V2_A1_ADAPTER_ENABLED } = {}) {
  if (!enabled) return null;
  if (!isL04V2RuntimeSurface(surface)) return null;
  return getL04V2RuntimeSurface(surface);
}
