import assert from 'node:assert/strict';
import {L04_V2_EXACT_SURFACES,isL04V2RuntimeSurface,getL04V2RuntimeSurface} from '../src/hnk/l04-v2-runtime-consumer-v1.mjs';
assert.equal(L04_V2_EXACT_SURFACES.length,8);
for(const s of L04_V2_EXACT_SURFACES){assert.equal(isL04V2RuntimeSurface(s),true);assert.equal(getL04V2RuntimeSurface(s)?.surface,s);}
for(const s of ['ERU VALI','ERU PARAZAMI','ERU DAYI VEMI LOKANI KE','ERU SALI SAVETA KE','SARU ERU DAYI KE','SARU ERU SALI KE','ERU RUMI KE','SARU VALI KE']){assert.equal(isL04V2RuntimeSurface(s),false);assert.equal(getL04V2RuntimeSurface(s),null);}
console.log('PASS L04 V2 RUNTIME CONSUMER STATIC CONTRACT: 8 exact surfaces accepted; 8 forbidden probes rejected');
