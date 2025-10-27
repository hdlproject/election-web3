import { Contract, BrowserProvider, JsonRpcProvider } from 'ethers';
import { getAddress, ContractName } from './addresses';
import { MissingAbiError, MissingAddressError } from './errors';
// Direct ABI imports (ensure you ran backend abi generation + sync)
// These imports will fail if files absent; generate ABIs first.
import CitizenshipAbi from '../abi/Citizenship.json';
import MoneyAbi from '../abi/Money.json';
import ElectionAbi from '../abi/Election.json';
import BadgeAbi from '../abi/Badge.json';

const abiMap: Record<ContractName, any> = {
  Citizenship: CitizenshipAbi,
  Money: MoneyAbi,
  Election: ElectionAbi,
  Badge: BadgeAbi,
};

function getAbi(name: ContractName) {
  const abi = abiMap[name];
  if (!abi) throw new MissingAbiError(name);
  return abi;
}

function safeGetAddress(name: ContractName) {
  try { return getAddress(name); } catch { throw new MissingAddressError(name); }
}

export function getReadContract(name: ContractName, provider: JsonRpcProvider) {
  return new Contract(safeGetAddress(name), getAbi(name), provider);
}

export async function getWriteContract(name: ContractName, browserProvider: BrowserProvider) {
  const signer = await browserProvider.getSigner();
  return new Contract(safeGetAddress(name), getAbi(name), signer);
}

export function getContracts(provider: JsonRpcProvider) {
  return {
    citizenship: getReadContract('Citizenship', provider),
    money: getReadContract('Money', provider),
    election: getReadContract('Election', provider),
    badge: getReadContract('Badge', provider),
  };
}

// Convenience per-contract accessors
export const citizenship = {
  read: (provider: JsonRpcProvider) => getReadContract('Citizenship', provider),
  write: (bp: BrowserProvider) => getWriteContract('Citizenship', bp),
};
export const money = {
  read: (provider: JsonRpcProvider) => getReadContract('Money', provider),
  write: (bp: BrowserProvider) => getWriteContract('Money', bp),
};
export const election = {
  read: (provider: JsonRpcProvider) => getReadContract('Election', provider),
  write: (bp: BrowserProvider) => getWriteContract('Election', bp),
};
export const badge = {
  read: (provider: JsonRpcProvider) => getReadContract('Badge', provider),
  write: (bp: BrowserProvider) => getWriteContract('Badge', bp),
};
