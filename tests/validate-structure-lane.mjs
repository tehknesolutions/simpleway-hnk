import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/structure-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/structure-lane-human-batch.v1.json');
const evidence=await json('progress/evidence-overrides.v1.json');
const bindings=await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

assert.equal(lane.lane_id,'SWHNK-L01-STRUCTURE-LANE-AUTHORING-V1');
assert.equal(lane.status,'AUTHORED_7_OF_7_VALIDATION_PENDING');
assert.equal(lane.headers.length,2);
assert.equal(lane.structures.length,5);
assert.deepEqual(lane.headers.map(x=>x.slot_id),['L01-HDR-001','L01-HDR-002']);
assert.deepEqual(lane.structures.map(x=>x.slot_id),['L01-STR-001','L01-STR-002','L01-STR-003','L01-STR-004','L01-STR-005']);
assert.equal(lane.metrics.total_AUTHORED,7);
assert.equal(lane.metrics.VALIDATED,0);
assert.equal(lane.metrics.FROZEN,0);
assert.equal(lane.metrics.new_HNK_lexical_forms,0);
assert.equal(lane.metrics.new_HNK_grammar_rules_beyond_validated_course_frames,0);
assert.equal(lane.source_contract.payload_historical_recovery_claim,false);

const names=Object.fromEntries(lane.structures.map(x=>[x.slot_id,x]));
assert.equal(names['L01-STR-001'].frame,'KALA YA EN ES KU KE');
assert.match(names['L01-STR-001'].authority_boundary,/YA\/ES remain/);
assert.equal(names['L01-STR-002'].frame,'EN + DOMAIN + KE');
assert.match(names['L01-STR-002'].authority_boundary,/does not create a HAVE verb/);
assert.equal(names['L01-STR-003'].frame,'EN + KU + DOMAIN + KE');
assert.match(names['L01-STR-003'].authority_boundary,/KU exact historical WH gloss remains unrecovered/);
assert.equal(names['L01-STR-004'].frame,'EN + DOMAIN + KUVAN + KE');
assert.match(names['L01-STR-004'].authority_boundary,/KUVAN remains CANDIDATE/);
assert.equal(names['L01-STR-005'].frame,'EN + VAME + CONTENT + KE');
assert.match(names['L01-STR-005'].authority_boundary,/VAME remains GATE/);

assert.equal(bindings.metrics.validated,10);
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,5);
assert.equal(batch.projected_effect_if_all_approved.structure_headers_VALIDATED,2);
assert.equal(batch.projected_effect_if_all_approved.structures_VALIDATED,5);
assert.equal(batch.projected_effect_if_all_approved.global_VALIDATED_after,89);
assert.equal(batch.projected_effect_if_all_approved.new_HNK_lexical_forms,0);
assert.equal(batch.projected_effect_if_all_approved.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Structure_headers_target,2);
assert.equal(v.L01_Structure_headers_authored,2);
assert.equal(v.L01_Structure_headers_validated,0);
assert.equal(v.L01_Structures_target,5);
assert.equal(v.L01_Structures_authored,5);
assert.equal(v.L01_Structures_validated,0);
assert.equal(v.L01_Structure_lane_authored_or_better,7);
assert.equal(v.prepared_structure_batch,'../curriculum/cycle-01/L01-kether/validation/structure-lane-human-batch.v1.json');

console.log('PASS SWHNK-L01-STRUCTURE-LANE-V1');
console.log('2 headers + 5 structures AUTHORED; validation pending; no new lexicon, no universal historical grammar claim, authority boundaries preserved.');
