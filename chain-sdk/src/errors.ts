// Custom error types for clearer consumer handling
export class MissingAddressError extends Error {
  constructor(contract: string) {
    super(`Address for contract '${contract}' not set. Call setAddresses().`);
    this.name = 'MissingAddressError';
  }
}

export class MissingAbiError extends Error {
  constructor(contract: string) {
    super(`ABI missing for '${contract}'. Run backend 'npm run abi' then sdk 'npm run sync:abi'.`);
    this.name = 'MissingAbiError';
  }
}

export class ProviderNotFoundError extends Error {
  constructor() { super('Injected provider not found (window.ethereum)'); this.name='ProviderNotFoundError'; }
}

export class UserRejectedError extends Error {
  constructor() { super('User rejected account access'); this.name='UserRejectedError'; }
}

