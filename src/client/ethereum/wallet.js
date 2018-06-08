import ethers from 'ethers';

class Wallet {
  constructor(privateKey) {
    if (privateKey) {
      this.wallet = new ethers.Wallet(privateKey);
    } else {
      this.wallet = new ethers.Wallet.createRandom();
    }
  }


}

export default Wallet;