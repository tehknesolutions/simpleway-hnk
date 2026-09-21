import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
const [html,js,css]=await Promise.all([readFile('experiments/sw-hnk-v2/index.html','utf8'),readFile('experiments/sw-hnk-v2/app.mjs','utf8'),readFile('experiments/sw-hnk-v2/styles.css','utf8')]);
assert.match(html,/SimpleWay HNK V2/);assert.match(js,/HNK_CHESed_PACK/);assert.match(js,/REQUIRED_UNRESOLVED/);assert.match(js,/unresolvedRequiredMedia/);assert.match(css,/@media\(max-width:850px\)/);assert.doesNotMatch(js,/PENDING_CANON_SAFE_ASSET[^']*<img/);
console.log('SWHNK_V2_UI_CONTRACT_PASS');
