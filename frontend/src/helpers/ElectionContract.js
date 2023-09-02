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

  async registerElector(address) {
    await this.contract.registerElector(address)
        .then(async tx => {
          return await tx.wait();
        })
        .catch(err => {
          console.log('Error: ', err);
        });
  }

    async elect(address) {
        await this.contract.elect(address)
            .then(async tx => {
                return await tx.wait();
            })
            .catch(err => {
                console.log('Error: ', err);
            });
    }

    async start() {
        await this.contract.start()
            .then(async tx => {
                return await tx.wait();
            })
            .catch(err => {
                console.log('Error: ', err);
            });
    }

    async finish() {
        await this.contract.start()
            .then(async tx => {
                return await tx.wait();
            })
            .catch(err => {
                console.log('Error: ', err);
            });
    }
}

export default new ElectionContract();
