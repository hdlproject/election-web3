import {Contract} from 'ethers';

import AlchemyClient from './AlchemyClient';

const contract = require('../contracts/Money.json');

class MoneyContract {
  constructor() {
    this.contract = new Contract(
      process.env.REACT_APP_MONEY_CONTRACT_ADDRESS,
      contract,
      AlchemyClient.wallet);
  }

  async mint(address, amount) {
    await this.contract.mint(address, amount)
      .then(async (tx) => {
        return await tx.wait();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  async burn(address, amount) {
    await this.contract.burn(address, amount)
      .then(async (tx) => {
        return await tx.wait();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  async transfer(address, amount) {
    await this.contract.transfer(address, amount)
      .then(async (tx) => {
        return await tx.wait();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }
}

export default new MoneyContract();
