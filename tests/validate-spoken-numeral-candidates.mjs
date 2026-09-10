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
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    for (let j = 0; j < cur.length; j++) prev[j] = cur[j];
  }
  return prev[b.length];
}

const proposal = await json('proposals/language/HNK_SPOKEN_NUMERAL_0_9_CANDIDATES_V1.json');
const strategyBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-human-batch.v1.json');
const promotionBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const promotionRecord = await json('proposals/language/HNK_SPOKEN_NUMERAL_0_9_PROMOTION_RECORD_V1.json');

const currentLanguageFormsAtGeneration = [
  'VAMAKALA','SARADAYA','VALIVAN','PARAZAMO','VAMUSARO','SARASALA','VAMAVALA','VAMAZAMU',
  'TAYOVAN','KALOVALA','PAROVAN','PARAZAMI','VALI','SAROSARI','PARI','DAYI','SALI','SARU','TA','PA',
  'PAPA','MAMA','VAMATAYA','KALIFORNIA','VAME','ON','BANKA','VANUVALAKALU','SAROSAL','VANUVALI','VANI','PITSA','HENUVOKODAN',
  'KUVAN','VALA','KUON','NE',
];
const gid = {A:'G01',E:'G02',I:'G03',O:'G04',U:'G05',H:'G07',M:'G11',N:'G12',L:'G14',R:'G15',B:'G18',D:'G19',P:'G21',T:'G22',K:'G23',S:'G26',V:'G31',Z:'G32',Y:'G40'};
const forms = ['BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA'];
const ids = ['AUTH-005','AUTH-006','AUTH-007','AUTH-008','AUTH-009','AUTH-010','AUTH-011','AUTH-012','AUTH-013','AUTH-014'];

assert.equal(strategyBatch.status, 'APPROVED_STRATEGY_CANDIDATE_GENERATION_AUTHORIZED');
assert.equal(proposal.status, 'CANDIDATES_GENERATED_AWAITING_INDIVIDUAL_PROMOTION');
assert.equal(proposal.formation_type, 'PRIMITIVE_AUTHORED');
assert.equal(proposal.historical_recovery_claim, false);
assert.deepEqual(proposal.candidates.map(x => x.form), forms);

for (const cand of proposal.candidates) {
  assert.deepEqual(cand.glyph_ids, [...cand.form].map(ch => gid[ch]));
  const nearest = Math.min(...currentLanguageFormsAtGeneration.map(form => levenshtein(cand.form, form)));
  assert.ok(nearest >= 3);
  assert.equal(cand.nearest_current_edit_distance, nearest);
}
for (let i = 0; i < forms.length; i++) for (let j = i + 1; j < forms.length; j++) assert.ok(levenshtein(forms[i], forms[j]) >= 3);
assert.equal(proposal.set_audit.minimum_distance_to_current_language_assets, 3);
assert.equal(proposal.set_audit.minimum_pairwise_distance, 3);
assert.equal(proposal.set_audit.canonical_registry_entries_created, 0, 'Historical generation snapshot must remain immutable');

assert.equal(promotionBatch.status, 'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.deepEqual(promotionBatch.candidates.map(x => x.form), forms);
assert.deepEqual(promotionBatch.candidates.map(x => x.registry_id), ids);
assert.ok(promotionBatch.candidates.every(x => x.authority === 'CANDIDATE'));
assert.equal(promotionBatch.applied_effect.recovered_cycle1_forms, 31);
assert.equal(promotionBatch.applied_effect.authored_cycle1_candidates_after, 14);
assert.equal(promotionBatch.applied_effect.governed_unique_language_assets_after, 45);
assert.equal(promotionBatch.applied_effect.governed_asset_proxy_percent_after, 31.25);
assert.equal(promotionBatch.applied_effect.L01_OPI_validated, 7);
assert.equal(promotionBatch.applied_effect.new_FROZEN_forms, 0);

assert.equal(promotionRecord.status, 'PROMOTED_TO_CANONICAL_AUTHORED_REGISTRY_AS_CANDIDATES');
assert.deepEqual(promotionRecord.entries.map(x => x.id), ids);
assert.deepEqual(promotionRecord.entries.map(x => x.form), forms);
assert.ok(promotionRecord.entries.every(x => x.authority === 'CANDIDATE'));
assert.equal(promotionRecord.boundaries.recovered_cycle1_forms_after, 31);
assert.equal(promotionRecord.boundaries.authored_candidates_after, 14);
assert.equal(promotionRecord.boundaries.governed_unique_language_assets_after, 45);
assert.equal(promotionRecord.boundaries.OPI3_validated, false);

console.log('PASS SWHNK-HNK-SPOKEN-NUMERAL-0-9-CANDIDATES-V3');
console.log('Generation audit preserved; exact numeral set is now registered as AUTH-005..014 CANDIDATE; recovered forms stay 31; OPI3 remains HOLD.');
