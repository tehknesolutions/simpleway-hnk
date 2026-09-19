import assert from 'node:assert/strict';
import {
  ACQUISITION_ENGINE_VERSION,
  deterministicShuffle,
  acquisitionStage,
  presentationPolicy,
  buildCodexCueTray,
  canUseHelp,
  getDueReviewLevelIds,
  deriveWeakIntents,
  adaptiveBossProfile
} from '../experiments/a1-rc1-sprint1/core/acquisition.mjs';

assert.equal(ACQUISITION_ENGINE_VERSION,'HNK-A1-ACQUISITION-ENGINE-V1');

const source=['A','B','C','D','E'];
const one=deterministicShuffle(source,'same-seed');
const two=deterministicShuffle(source,'same-seed');
assert.deepEqual(one,two);
assert.deepEqual([...one].sort(),source);
assert.deepEqual(source,['A','B','C','D','E']);

assert.equal(acquisitionStage(1),'GUIDED');
assert.equal(acquisitionStage(9),'SUPPORTED');
assert.equal(acquisitionStage(17),'FADED');
assert.equal(acquisitionStage(25),'RECALL');
assert.equal(presentationPolicy(25).recallBeforeHelp,true);

const state={
  qaSessionId:'SESSION-TEST',
  completedLevels:['L01','L02','L03','L04'],
  hintsUsed:{L02:1},
  codexUsed:{L03:true},
  attempts:{
    L01:{count:1,correct:1},
    L02:{count:3,correct:1},
    L03:{count:2,correct:1}
  },
  acquisition:{
    recallAttempts:{L05:0,L06:1},
    reviewHistory:{L01:[],L02:[5]}
  }
};
assert.equal(canUseHelp(state,'L05'),false);
assert.equal(canUseHelp(state,'L06'),true);

const cueLevel={id:'L10',order:10};
const cues=buildCodexCueTray(['AN','NE','VALI','PA'],state,cueLevel);
assert.ok(cues.length>=1 && cues.length<4);
assert.ok(cues.every(token=>['AN','NE','VALI','PA'].includes(token)));

const levels=[
  {id:'L01',order:1,targetIntent:'GREETING'},
  {id:'L02',order:2,targetIntent:'NEGATE'},
  {id:'L03',order:3,requiredIntents:['ASK','ANSWER']},
  {id:'L04',order:4,targetIntent:'THANKS'},
  {id:'L05',order:5,targetIntent:'OTHER'},
  {id:'L06',order:6,targetIntent:'OTHER2'},
  {id:'L07',order:7,targetIntent:'OTHER3'},
  {id:'L08',order:8,targetIntent:'OTHER4'}
];
const due=getDueReviewLevelIds(state,levels,8,3);
assert.ok(due.includes('L01'));
assert.ok(due.includes('L03') || due.includes('L04'));

const weak=deriveWeakIntents(state,levels,4);
assert.ok(weak.includes('NEGATE'));
assert.ok(weak.includes('ASK'));
assert.ok(weak.includes('ANSWER'));

const boss=adaptiveBossProfile(state,levels);
assert.ok([4,5,6].includes(boss.objectiveCount));
assert.ok(Array.isArray(boss.weakIntents));

console.log('PASS HNK-A1-ACQUISITION-ENGINE');
