import {Contract} from 'ethers';

import AlchemyClient from './AlchemyClient';

const contract = require('../contracts/Citizenship.json');

class CitizenshipContract {
  constructor() {
    this.contract = new Contract(
      process.env.REACT_APP_CITIZENSHIP_CONTRACT_ADDRESS,
      contract,
      AlchemyClient.wallet);
  }

  async registerCitizen(address, id, age) {
    await this.contract.registerCitizen(address, id, age)
      .then(async tx => {
        return await tx.wait();
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }
}

export default new CitizenshipContract();
