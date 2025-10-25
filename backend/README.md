# Election Backend
A Solidity project that contains a backend part of an election app.

## How to Prepare
### Run Ganache
To run a personal blockchain network in local environment:
- Download Ganache from [here](https://trufflesuite.com/ganache/index.html)
- Install Ganache
```shell
$ chmod u+x <ganache.AppImage>
$ ./<ganache.AppImage>
```

### Run Ganche via npx
```shell
$ npx ganache -p 7545
```

### Test locally
```shell
$ npx truffle test
```

### Deploy & Verify Smart Contract to Holesky Testnet
```shell
$ yarn run deployholesky
$ yarn run verifyholesky <contract_name>
```
Flatten smart contract to verify it manually. Don't forget to remove duplicate license comments.
```shell
$ mkdir -p ./flat_contracts
$ npx truffle-flattener ./contracts/Citizenship.sol > ./flat_contracts/Citizenship.sol
```

### Deploy Subgraph The Graph
```shell
$ npx graph init citizenship ./graph/citizenship \
    --abi=./build/contracts/Citizenship.json \
    --from-contract 0x5aE6D570c89025135e55B6dfff3AeEC72E68AFC2 \
    --network holesky \
    --protocol ethereum \
    --contract-name=Citizenship \
    --index-events \
    --start-block=0
$ npx graph auth 22844a2041e8319d42dc0a938e439e8f
$ cd ./graph/citizenship
$ npx graph codegen && npx graph build
$ npx graph deploy citizenship --version-label v0.0.1
```
Open [The Graph Studio](https://thegraph.com/studio/subgraph/citizenship/playground) to start querying the data!
