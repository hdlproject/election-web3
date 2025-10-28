#!/usr/bin/env node
// Minimal address extraction from Truffle artifacts.
// Scans backend/build/contracts for core contract artifact JSON files and
// takes the FIRST network entry (Object.keys order) for each to build contract_addresses.json.
// Contracts: Citizenship, Money, Election, Badge
// Usage: node scripts/generate-addresses.js

import { promises as fs } from 'fs';
import path from 'path';

const CORE_CONTRACTS = ['Citizenship','Money','Election','Badge'];

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const artifactsDir = path.resolve(__dirname, '../../backend/build/contracts');
const outputPath = path.resolve(__dirname, '../contract_addresses.json');

async function main() {
  const out = {};

  let files;
  try {
    files = await fs.readdir(artifactsDir);
  } catch (e) {
    console.error('Artifacts directory not found:', artifactsDir);
    process.exit(1);
  }

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const full = path.join(artifactsDir, file);
    let content;
    try { content = JSON.parse(await fs.readFile(full, 'utf8')); } catch { continue; }
    const name = content.contractName;
    if (!CORE_CONTRACTS.includes(name)) continue;
    const networks = content.networks || {};
    const keys = Object.keys(networks);
    if (keys.length === 0) {
      console.warn(`No networks found for ${name} (deploy first).`);
      continue;
    }
    const firstKey = keys[0];
    const selected = networks[firstKey];
    if (selected && selected.address) {
      out[name] = selected.address;
    } else {
      console.warn(`Network entry '${firstKey}' for ${name} lacks address.`);
    }
  }

  if (Object.keys(out).length === 0) {
    console.error('No contract addresses extracted. Ensure migrations were run.');
    process.exit(1);
  }

  await fs.writeFile(outputPath, JSON.stringify(out, null, 2));
  console.log('Wrote', outputPath);
  for (const [k,v] of Object.entries(out)) console.log(' ', k, '->', v);
}

main().catch(e => { console.error(e); process.exit(1); });
