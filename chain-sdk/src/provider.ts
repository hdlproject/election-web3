import {JsonRpcProvider, BrowserProvider} from 'ethers';
import { ProviderNotFoundError, UserRejectedError } from './errors';

/** Create a read-only provider from RPC URL */
export function getReadProvider(rpcUrl: string) {
    return new JsonRpcProvider(rpcUrl);
}

/** Get a BrowserProvider (MetaMask / injected) */
export function getBrowserProvider() {
  const eth = (globalThis as any).ethereum;
  if (!eth) throw new ProviderNotFoundError();
  return new BrowserProvider(eth);
}

/** Request accounts & return signer */
export async function getBrowserSigner() {
  const provider = getBrowserProvider();
  try {
    await (globalThis as any).ethereum.request({ method: 'eth_requestAccounts' });
  } catch (err: any) {
    if (err && err.code === 4001) throw new UserRejectedError();
    console.error('[getBrowserSigner] Failed to request accounts', err);
    throw err instanceof Error ? err : new Error('Failed to request accounts');
  }
  return provider.getSigner();
}

/** Convenience bundle returning common elements */
export function createSdkContext(rpcUrl: string) {
  const readProvider = getReadProvider(rpcUrl);
  return { readProvider };
}
