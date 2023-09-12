import {Contract} from 'ethers';

import AlchemyClient from './AlchemyClient';

const contract = require('../contracts/Badge.json');

class BadgeContract {
  constructor() {
    this.contract = new Contract(
        process.env.REACT_APP_BADGE_CONTRACT_ADDRESS,
        contract,
        AlchemyClient.wallet);
  }

  async setMinisterBadgeId(tokenId) {
    await this.contract.setMinisterBadgeId(tokenId)
        .then(async (tx) => {
          return await tx.wait();
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
  }

  async changeMinister(address) {
    await this.contract.changeMinister(address)
        .then(async (tx) => {
          return await tx.wait();
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
  }
}

export default new BadgeContract();
