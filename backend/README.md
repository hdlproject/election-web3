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
