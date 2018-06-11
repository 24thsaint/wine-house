import ethers from 'ethers';

class EthereumWallet {
  constructor(privateKey) {
    if (privateKey) {
      this.wallet = new ethers.Wallet(privateKey);
    } else {
      this.wallet = new ethers.Wallet.createRandom(new Date().getTime());
    }
  }

  static async unlockWallet(walletJSON, password, progressFunction) {
    const wallet = await new ethers.Wallet.fromEncryptedWallet(walletJSON, password, progressFunction);
    return wallet;
  }
}

export default EthereumWallet;