# chain-sdk (Minimal)

Lightweight helpers to interact with your smart contracts using ethers + ABIs. No Alchemy, no extras.

## Prerequisites
Generate ABIs in backend:
```bash
cd backend
npm run abi
```
Sync ABIs into SDK:
```bash
cd chain-sdk
npm run sync:abi
```

## Install & Build
```bash
cd chain-sdk
npm install
npm run build
```

## Set Contract Addresses
```ts
import { setAddresses } from 'chain-sdk';
setAddresses({
  Citizenship: '0xCitizenship',
  Money: '0xMoney',
  Election: '0xElection',
  Badge: '0xBadge'
});
```

## Providers
```ts
import { getReadProvider, getBrowserProvider, getBrowserSigner } from 'chain-sdk';
const readProvider = getReadProvider(import.meta.env.VITE_RPC_URL);
const browserProvider = getBrowserProvider(); // for writes
```

## Read / Write Examples
```ts
import { citizenship } from 'chain-sdk';

// Read
const cRead = citizenship.read(readProvider);
const president = await cRead.getPresident();

// Write
const cWrite = await citizenship.write(browserProvider);
const tx = await cWrite.registerCitizen('0xWallet', 'ID-1', 30);
await tx.wait();
```

## Generic Access
```ts
import { getReadContract, getWriteContract, getReadProvider, getBrowserProvider } from 'chain-sdk';
const rp = getReadProvider(import.meta.env.VITE_RPC_URL);
const contract = getReadContract('Election', rp);
```

## Address Management Enhancements
- Load from JSON file: `await loadAddressesFromFile('./contract_addresses.json')` after bundling.
- Generate a JSON from env vars:
```bash
CONTRACT_CITIZENSHIP=0x... CONTRACT_MONEY=0x... node scripts/generate-addresses.js
```
Creates `contract_addresses.json` you can commit or consume.

## Aggregate Contracts
```ts
import { getContracts, getReadProvider } from 'chain-sdk';
const provider = getReadProvider(import.meta.env.VITE_RPC_URL);
const { citizenship, election } = getContracts(provider);
```

## Errors (Custom)
- `MissingAddressError`
- `MissingAbiError`
- `ProviderNotFoundError`
- `UserRejectedError`

## Tests
Run minimal tests:
```bash
npm test
```

## Linking to Frontend (if separate submodule)
```bash
cd chain-sdk
npm link
cd ../frontend
npm link chain-sdk
```
Re-run if dependencies reset.

## Next (Optional Enhancements)
- Add TypeChain for typed contracts.
- Multi-network address handling.
- Caching / multicall.
