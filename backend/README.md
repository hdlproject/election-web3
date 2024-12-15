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

### Deploy Subgraph Graph API
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

## Smart Contract
### Holesky
- Migrations: 0xfa800DC69F30577D235d7b461504fB5E24B47500
- Citizenship: 0x5aE6D570c89025135e55B6dfff3AeEC72E68AFC2
- Money: 0x3c8704BD9DB441BD2D83fa80044b7E2Bd80D72dC
- Election: 0xf64D879cc6a5210D1503a87a521A5c08C9604ABe
- Badge: 0x387F0dF9e547D180BD7Feabb0039EB050B888aA5
### Sepolia
- Migrations: 0x8f83a86b421A4940e96236423eA1579F869E6526
- Citizenship: 
- Money: 
- Election: 
- Badge: 

## How to Test
List of accounts
- Citizen
  - 0xB5A65D021f071269dcfB7B61a85da8F99b40c89f
  - 0x6063CC1113940e799e62CDa87812784C0A96e34e
  - 0x5ab421EC3788cfe61044944Bb47B63336951a4C4 - 15 years old, not old enough
- Not citizen
  - 0x1097c4988539d173c5d641F7d73FB97439D30Fa6
