import assert from 'node:assert/strict';
import {campaignLevels} from '../experiments/a1-rc1-sprint1/core/levels.mjs';
import {L04_V2_BRIDGE_MISSIONS,loadL04V2Bridge} from '../experiments/a1-rc1-sprint1/core/l04-v2-pedagogical-bridge.mjs';
assert.equal(campaignLevels.length,32);
assert.equal(loadL04V2Bridge().length,0);
const bridge=loadL04V2Bridge({enabled:true});
assert.equal(bridge.length,5);
assert.equal(bridge.flatMap(x=>x.surfaces).length,8);
assert.deepEqual([...new Set(bridge.map(x=>x.family))],['STR001','STR002','STR003','STR004','STR005']);
for(const m of bridge){assert.equal(m.stages.length,5);assert.equal(m.resolved.length,m.surfaces.length);}
assert.equal(campaignLevels.length,32);
console.log('PASS L04 V2 PEDAGOGICAL BRIDGE: 5 micro-missions / 8 governed surfaces; default OFF; A1 baseline remains 32 levels');
