import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

function levenshtein(a, b) {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    for (let j = 0; j < cur.length; j++) prev[j] = cur[j];
  }
  return prev[b.length];
}

const proposal = await json('proposals/language/HNK_SPOKEN_NUMERAL_0_9_CANDIDATES_V1.json');
const strategyBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-human-batch.v1.json');
const promotionBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');

const currentLanguageForms = [
  'VAMAKALA','SARADAYA','VALIVAN','PARAZAMO','VAMUSARO','SARASALA','VAMAVALA','VAMAZAMU',
  'TAYOVAN','KALOVALA','PAROVAN','PARAZAMI','VALI','SAROSARI','PARI','DAYI','SALI','SARU','TA','PA',
  'PAPA','MAMA','VAMATAYA','KALIFORNIA','VAME','ON','BANKA','VANUVALAKALU','SAROSAL','VANUVALI','VANI','PITSA','HENUVOKODAN',
  'KUVAN','VALA','KUON','NE',
];

const gid = {
  A:'G01', E:'G02', I:'G03', O:'G04', U:'G05', H:'G07', M:'G11', N:'G12', L:'G14', R:'G15',
  B:'G18', D:'G19', P:'G21', T:'G22', K:'G23', S:'G26', V:'G31', Z:'G32', Y:'G40',
};

assert.equal(strategyBatch.status, 'APPROVED_STRATEGY_CANDIDATE_GENERATION_AUTHORIZED');
assert.equal(strategyBatch.decision.approval, 'APPROVED_SCOPED_STRATEGY_ONLY');
assert.equal(strategyBatch.decision.effect.canonical_registry_entries_created_by_this_batch, 0);

assert.equal(proposal.status, 'CANDIDATES_GENERATED_AWAITING_INDIVIDUAL_PROMOTION');
assert.equal(proposal.formation_type, 'PRIMITIVE_AUTHORED');
assert.equal(proposal.historical_recovery_claim, false);
assert.equal(proposal.candidates.length, 10);
assert.deepEqual(proposal.candidates.map(x => x.value), [0,1,2,3,4,5,6,7,8,9]);
assert.deepEqual(proposal.candidates.map(x => x.form), ['BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA']);
assert.ok(proposal.candidates.every(x => x.authority === 'CANDIDATE_PROPOSED'));
assert.ok(proposal.candidates.every(x => x.exact_collision === false));
assert.ok(proposal.candidates.every(x => /^[A-Z][AEIOU][A-Z][AEIOU]$/.test(x.form)));
assert.ok(proposal.candidates.every(x => x.form[1] !== x.form[3]));
assert.equal(new Set(proposal.candidates.map(x => x.form[0])).size, 10);

for (const cand of proposal.candidates) {
  const expectedGids = [...cand.form].map(ch => gid[ch]);
  assert.ok(expectedGids.every(Boolean), `${cand.form} must use safe HNK40 units only`);
  assert.deepEqual(cand.glyph_ids, expectedGids, `${cand.form} glyph mapping drift`);
  const nearest = Math.min(...currentLanguageForms.map(form => levenshtein(cand.form, form)));
  assert.ok(nearest >= 3, `${cand.form} is too close to current language assets: ${nearest}`);
  assert.equal(cand.nearest_current_edit_distance, nearest);
}

for (let i = 0; i < proposal.candidates.length; i++) {
  for (let j = i + 1; j < proposal.candidates.length; j++) {
    const a = proposal.candidates[i].form;
    const b = proposal.candidates[j].form;
    assert.ok(levenshtein(a, b) >= 3, `${a} and ${b} are too confusable`);
  }
}

assert.equal(proposal.set_audit.minimum_distance_to_current_language_assets, 3);
assert.equal(proposal.set_audit.minimum_pairwise_distance, 3);
assert.equal(proposal.set_audit.canonical_registry_entries_created, 0);
assert.equal(proposal.progress_effect.L01_OPI_validated, 7);
assert.equal(proposal.progress_effect.change, 0);

assert.equal(promotionBatch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(promotionBatch.candidates.length, 10);
assert.deepEqual(promotionBatch.candidates.map(x => x.form), ['BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA']);
assert.deepEqual(promotionBatch.candidates.map(x => x.proposed_registry_id), ['AUTH-005','AUTH-006','AUTH-007','AUTH-008','AUTH-009','AUTH-010','AUTH-011','AUTH-012','AUTH-013','AUTH-014']);
assert.equal(promotionBatch.projected_effect_if_approved.recovered_cycle1_forms_after, 31);
assert.equal(promotionBatch.projected_effect_if_approved.authored_cycle1_candidates_after, 14);
assert.equal(promotionBatch.projected_effect_if_approved.governed_unique_language_assets_after, 45);
assert.equal(promotionBatch.projected_effect_if_approved.governed_asset_proxy_percent_after, 31.25);
assert.equal(promotionBatch.projected_effect_if_approved.L01_OPI_validated_after, 7);
assert.equal(promotionBatch.projected_effect_if_approved.new_FROZEN_forms, 0);

console.log('PASS SWHNK-HNK-SPOKEN-NUMERAL-0-9-CANDIDATES-V2');
console.log('Ten collision-safe numeral forms generated; promotion batch remains awaiting explicit approval; canonical assets stay 35 and OPI3 stays HOLD.');
