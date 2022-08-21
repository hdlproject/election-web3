import {Alchemy, Network} from 'alchemy-sdk';

class AlchemyClient {
    constructor() {
        const settings = {
            apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
            network: AlchemyClient.getAlchemyBlockchainNetwork(process.env.REACT_APP_BLOCKCHAIN_NETWORK),
        };
        this.alchemy = new Alchemy(settings);
    }

    static getAlchemyBlockchainNetwork(blockchainNetwork) {
        switch (blockchainNetwork) {
            case 'MAINNET':
                return Network.ETH_MAINNET
            case 'GOERLI':
                return Network.ETH_GOERLI
            case 'ROPSTEN':
                return Network.ETH_ROPSTEN
            default:
                return Network.ETH_GOERLI
        }
    }

    estimateGas(to, data, value) {
        this.alchemy.core.estimateGas({
            to: to,
            data: data,
            value: value,
        }).then(console.log);
    }

    getGasPrice() {
        this.alchemy.core.getGasPrice().then(console.log);
    }

    getMaxPriorityFeePerGas() {
        const options = {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({id: 1, jsonrpc: '2.0', method: 'eth_maxPriorityFeePerGas'})
        };

        fetch(process.env.REACT_APP_ALCHEMY_HTTPS, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
}

export default AlchemyClient;
