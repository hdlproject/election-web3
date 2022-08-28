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
    const tx = await this.contract.registerCitizen(address, id, age);
    return await tx.wait();
  }
}

export default new CitizenshipContract();
