import ethers from 'ethers';

class Ethereum {
  constructor() {
    // TODO
  }

  async unlockWallet(walletJSON, password, progressFunction) {
    const wallet = new ethers.Wallet.fromEncryptedWallet(walletJSON, password, progressFunction);
    return wallet;
  }

  static generateWallet() {
    const wallet = new ethers.Wallet.createRandom(new Date().getTime());
    return wallet;
  }

  get wallet() {
    return this.wallet;
  }
}

export default Ethereum;