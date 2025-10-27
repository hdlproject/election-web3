// Ambient declarations for the minimal chain SDK.
// Provides:
// 1. JSON module typing so `import X from '../abi/Contract.json'` works.
// 2. Basic typing for the injected EVM provider (e.g. MetaMask) at window.ethereum.

declare module '*.json' {
  const value: any;
  export default value;
}

interface EthereumRequestArgs {
  method: string;
  params?: unknown[] | object;
}

interface ExternalEthereumProvider {
  isMetaMask?: boolean;
  request(args: EthereumRequestArgs): Promise<any>;
  on?(event: string, handler: (...args: any[]) => void): void;
  removeListener?(event: string, handler: (...args: any[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: ExternalEthereumProvider;
  }
}

export {};
