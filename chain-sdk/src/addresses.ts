// Simplified contract address registry (single network)
export type ContractName = 'Citizenship' | 'Money' | 'Election' | 'Badge';

let addresses: Partial<Record<ContractName, string>> = {};

export function setAddresses(a: Partial<Record<ContractName, string>>) {
  addresses = { ...addresses, ...a };
}

export function getAddress(name: ContractName): string {
  const addr = addresses[name];
  if (!addr) throw new Error(`Address for contract '${name}' not set. Call setAddresses().`);
  return addr;
}

export function listAddresses() {
  return { ...addresses };
}

export function clearAddresses() { addresses = {}; }

export type AddressesJson = Partial<Record<ContractName, string>>;

/** Load addresses from a JSON object (e.g. parsed file) */
export function loadAddresses(data: AddressesJson) {
  if (!data || typeof data !== 'object') throw new Error('Invalid addresses JSON');
  setAddresses(data);
}

/** Attempt to load addresses from a JSON file path at runtime (dynamic import) */
export async function loadAddressesFromFile(path: string) {
  try {
    const mod = await import(path);
    const json: AddressesJson = (mod as any).default || (mod as any);
    loadAddresses(json);
    return json;
  } catch (e: any) {
    throw new Error(`Failed to load addresses file '${path}': ${e.message}`);
  }
}
