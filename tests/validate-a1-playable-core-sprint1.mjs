import assert from 'node:assert/strict';
import { lexemes, constructions, LANGUAGE_VERSION, RUNTIME_STATUS, getConstructionByPattern } from '../experiments/a1-rc1-sprint1/core/registry.mjs';
import { validateUtterance, validateDialogue, tokenize } from '../experiments/a1-rc1-sprint1/core/validator.mjs';
import { WORLD_1 } from '../experiments/a1-rc1-sprint1/core/levels.mjs';
import { createPlayerState, awardLevel, recordAttempt, recordHint, getHintCount, penalizeHeart } from '../experiments/a1-rc1-sprint1/core/player-state.mjs';
import { routeForPathname } from '../experiments/a1-rc1-sprint1/core/http-routing.mjs';

assert.equal(LANGUAGE_VERSION,'HNK-A1-RC1-CANDIDATE');
assert.equal(RUNTIME_STATUS,'EXPERIMENTAL_HUMAN_QA_ONLY');

assert.equal(WORLD_1.levels.length,8);
assert.deepEqual(WORLD_1.levels.map(l=>l.order),[1,2,3,4,5,6,7,8]);
assert.equal(new Set(WORLD_1.levels.map(l=>l.id)).size,8);

for (const level of WORLD_1.levels) {
  assert.ok(Array.isArray(level.hints) && level.hints.length===3, `${level.id} must have exactly 3 hints`);
  assert.ok(level.xp>0, `${level.id} must award XP`);
}

for (const required of ['VODEMI','TUMAVI','PUMEK','MUNASE','AN','EN','ZAMI','HNK','VALI','NE','PA','KE']) {
  assert.ok(lexemes[required], `missing lexeme ${required}`);
  assert.equal(lexemes[required].a1Enabled,true);
}

assert.notEqual(lexemes.MUNASE.function,lexemes.NE.function);
assert.ok(lexemes.MUNASE.notes.some(n=>n.includes('not NE')));

assert.equal(validateUtterance('AN ZAMI HNK.').status,'VALID');
assert.equal(validateUtterance('AN NE VALI.').status,'VALID');
const negVali=getConstructionByPattern(tokenize('AN NE VALI.'));
assert.deepEqual(negVali.authority,['CANDIDATE','LOCKED_FOR_TESTING']);
assert.equal(validateUtterance('PA AN VALI.').status,'VALID');
assert.equal(validateUtterance('EN ZAMI HNK KE?').status,'VALID');

assert.equal(validateUtterance('AN VALI NE.').status,'UNMAPPED_CONSTRUCTION');
assert.equal(validateUtterance('EN VALI KE?').status,'UNMAPPED_CONSTRUCTION');
assert.equal(validateUtterance('AN ZAMI KE?').status,'UNMAPPED_CONSTRUCTION');
assert.equal(validateUtterance('MUNASE VALI.').status,'UNMAPPED_CONSTRUCTION');
assert.equal(validateUtterance('AN FOO VALI.').status,'UNKNOWN_LEXEME');

const q=getConstructionByPattern(tokenize('EN ZAMI HNK KE?'));
assert.ok(q);
assert.equal(q.generalizes,false);
assert.ok(q.guards.includes('KE_NOT_GENERALIZED'));

const dialogue=validateDialogue(['PUMEK.','AN ZAMI HNK.'],['YES_RESPONSE','STATE_SPEAK_HNK']);
assert.equal(dialogue.status,'VALID');
assert.equal(dialogue.communicativeSuccess,true);

const repeatedBeforeSuccess=validateDialogue(
  ['PUMEK.','PUMEK.','AN ZAMI HNK.'],
  ['YES_RESPONSE','STATE_SPEAK_HNK']
);
assert.equal(repeatedBeforeSuccess.status,'VALID');
assert.equal(repeatedBeforeSuccess.orderValid,true);
assert.equal(repeatedBeforeSuccess.communicativeSuccess,true);

const unmappedBeforeSuccess=validateDialogue(
  ['PUMEK AN ZAMI HNK.','PUMEK.','AN ZAMI HNK.'],
  ['YES_RESPONSE','STATE_SPEAK_HNK']
);
assert.equal(unmappedBeforeSuccess.status,'VALID');
assert.equal(unmappedBeforeSuccess.communicativeSuccess,true);

const reversed=validateDialogue(['AN ZAMI HNK.','PUMEK.'],['YES_RESPONSE','STATE_SPEAK_HNK']);
assert.equal(reversed.status,'INVALID_INTENT_ORDER');
assert.equal(reversed.orderValid,false);
assert.equal(reversed.communicativeSuccess,false);

const partial=validateDialogue(['PUMEK.'],['YES_RESPONSE','STATE_SPEAK_HNK']);
assert.equal(partial.status,'COMMUNICATIVE_PARTIAL');
assert.deepEqual(partial.missing,['STATE_SPEAK_HNK']);

let player=createPlayerState();
player=recordAttempt(player,'L01_FIRST_CONTACT',true);
player=awardLevel(player,WORLD_1.levels[0],{perfect:true,hintsUsed:0,firstTry:true});
assert.equal(player.completedLevels.includes('L01_FIRST_CONTACT'),true);
assert.equal(player.xp,25);
assert.ok(player.unlocked.includes('VODEMI'));

let hinted=createPlayerState();
hinted=recordHint(hinted,'L01_FIRST_CONTACT');
assert.equal(getHintCount(hinted,'L01_FIRST_CONTACT'),1);
hinted=recordAttempt(hinted,'L01_FIRST_CONTACT',true);
hinted=awardLevel(hinted,WORLD_1.levels[0],{perfect:true,hintsUsed:getHintCount(hinted,'L01_FIRST_CONTACT'),firstTry:true});
assert.equal(hinted.xp,20);

player=penalizeHeart(player,1);
assert.equal(player.hearts,4);

assert.deepEqual(routeForPathname('/'),{type:'redirect',location:'/web/'});
assert.deepEqual(routeForPathname('/web/'),{type:'file',path:'/web/index.html'});
assert.deepEqual(routeForPathname('/web/styles.css'),{type:'file',path:'/web/styles.css'});

for (const c of constructions) {
  assert.ok(c.id);
  assert.ok(c.intent);
  assert.equal(c.generalizes,false);
}

console.log('PASS HNK-A1-PLAYABLE-CORE-SPRINT1');
