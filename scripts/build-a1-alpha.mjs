import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=resolve(repoRoot,'experiments/a1-rc1-sprint1');
const out=resolve(repoRoot,'dist/a1');

await rm(out,{recursive:true,force:true});
await mkdir(resolve(out,'web'),{recursive:true});
await mkdir(resolve(out,'core'),{recursive:true});

await cp(resolve(source,'core'),resolve(out,'core'),{recursive:true});
await cp(resolve(source,'web'),resolve(out,'web'),{recursive:true});
await cp(resolve(source,'release.json'),resolve(out,'release.json'));

const original=await readFile(resolve(source,'web/index.html'),'utf8');
const rootIndex=original
  .replace('./styles.css','./web/styles.css')
  .replace('./app.mjs','./web/app.mjs')
  .replace('<title>HNK A1 — The Awakening</title>','<title>HNK A1 — Human QA Alpha 0.1</title>');
await writeFile(resolve(out,'index.html'),rootIndex);

console.log('BUILD HNK-A1-APP-ALPHA-0.1 -> dist/a1');
