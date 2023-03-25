import {Contract} from 'ethers';

import AlchemyClient from './AlchemyClient';

const contract = require('../contracts/Election.json');

class ElectionContract {
  constructor() {
    this.contract = new Contract(
      process.env.REACT_APP_ELECTION_CONTRACT_ADDRESS,
      contract,
      AlchemyClient.wallet);
  }

  async registerElectee(address) {
    await this.contract.registerElectee(address)
      .then(async tx => {
        return await tx.wait();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }
}

export default new ElectionContract();
