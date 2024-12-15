# Simple Ethereum App

## How to Run
- Install Truffle
```shell
$ npm install -g truffle
```
- Download Ganache from [here](https://trufflesuite.com/ganache/index.html)
- Install Ganache
```shell
$ chmod u+x <ganache.AppImage>
$ ./<ganache.AppImage>
```

## How to Build Graph API
```shell
$ yarn run deployholesky
$ yarn run verifyholesky <contract_name>
```
Flatten smart contract to verify it manually. Don't forget to remove duplicate license comments.
```shell
$ mkdir -p ./flat_contracts
$ npx truffle-flattener ./contracts/Citizenship.sol > ./flat_contracts/Citizenship.sol
```

### Deploy Subgraph Graph API
```shell
$ npx graph init citizenship ./graph/citizenship --abi=./build/contracts/Citizenship.json --from-contract 0x5aE6D570c89025135e55B6dfff3AeEC72E68AFC2 --network holesky --protocol ethereum
$ npx graph auth 22844a2041e8319d42dc0a938e439e8f
$ cd ./graph/citizenship
$ npx graph codegen && npx graph build
$ npx graph deploy citizenship --version-label v0.0.1
```

## How to Test
List of accounts
- Citizen
  - 0xB5A65D021f071269dcfB7B61a85da8F99b40c89f
  - 0x6063CC1113940e799e62CDa87812784C0A96e34e
  - 0x5ab421EC3788cfe61044944Bb47B63336951a4C4 - 15 years old, not old enough
- Not citizen
  - 0x1097c4988539d173c5d641F7d73FB97439D30Fa6
