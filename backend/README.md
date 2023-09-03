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
$ yarn global add @graphprotocol/graph-cli
$ graph init --studio citizenship
$ graph auth --studio 22844a2041e8319d42dc0a938e439e8f
$ cd citizenship
$ graph codegen && graph build
$ graph deploy --studio citizenship
```

## How to Test
List of accounts
- Citizen
  - 0xB5A65D021f071269dcfB7B61a85da8F99b40c89f
  - 0x6063CC1113940e799e62CDa87812784C0A96e34e
  - 0x5ab421EC3788cfe61044944Bb47B63336951a4C4
- Not citizen
  - 0x1097c4988539d173c5d641F7d73FB97439D30Fa6
