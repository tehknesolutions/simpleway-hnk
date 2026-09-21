import assert from 'node:assert/strict';
import {L04_V2_EXACT_SURFACES} from '../src/hnk/l04-v2-runtime-consumer-v1.mjs';
import {L04_V2_A1_ADAPTER_ENABLED,getL04V2A1AdapterState,resolveL04V2A1Surface} from '../experiments/a1-rc1-sprint1/core/l04-v2-adapter.mjs';

assert.equal(L04_V2_A1_ADAPTER_ENABLED,false);
const state=getL04V2A1AdapterState();
assert.equal(state.enabled,false);
assert.equal(state.surfaceCount,8);
for(const surface of L04_V2_EXACT_SURFACES){
  assert.equal(resolveL04V2A1Surface(surface),null);
  assert.equal(resolveL04V2A1Surface(surface,{enabled:true})?.surface,surface);
}
for(const surface of ['ERU VALI','ERU PARAZAMI','ERU DAYI VEMI LOKANI KE','ERU SALI SAVETA KE','SARU ERU DAYI KE','SARU ERU SALI KE','ERU RUMI KE','SARU VALI KE']){
  assert.equal(resolveL04V2A1Surface(surface,{enabled:true}),null);
}
console.log('PASS L04 V2 A1 LOADER ADAPTER: default OFF; 8/8 exact surfaces resolve only when explicitly enabled; 8 forbidden probes rejected');
