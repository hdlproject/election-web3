// Explicit public API barrel to avoid duplicate / unintended exports.
// Addresses
export {
    setAddresses,
    getAddress,
    listAddresses,
    clearAddresses,
    loadAddresses,
    loadAddressesFromFile,
} from './addresses';

export type {
    ContractName,
    AddressesJson,
} from './addresses';

// Provider helpers
export {
    getReadProvider,
    getBrowserProvider,
    getBrowserSigner,
    createSdkContext,
} from './provider';

// Contracts
export {
    getReadContract,
    getWriteContract,
    getContracts,
    citizenship,
    money,
    election,
    badge,
} from './contracts';

// Errors
export {
    MissingAddressError,
    MissingAbiError,
    ProviderNotFoundError,
    UserRejectedError,
} from './errors';
