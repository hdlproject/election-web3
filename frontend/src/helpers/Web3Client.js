import {providers} from 'ethers';

class Web3Client {
  constructor() {
    this.provider = new providers.Web3Provider(window.ethereum);
  }

  async getSigner() {
    if (!this.signer) {
      await this.provider.send('eth_requestAccounts', []);
      this.signer = this.provider.getSigner();
    }
    return this.signer;
  }

  async getAddress() {
    const signer = await this.getSigner();
    return await signer.getAddress();
  }
}

export default new Web3Client();
