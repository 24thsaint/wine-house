/* global window */
import ethers from 'ethers';
import axios from 'axios';

const providers = ethers.providers;
var provider = new providers.JsonRpcProvider('http://127.0.0.1:8545'); 

class EthereumContractClient {
  constructor() {
    this.provider = provider;
    this.Contract = ethers.Contract;
  }

  async getBalance(address) {
    const rawValue = await this.provider.getBalance(address);
    return ethers.utils.formatEther(rawValue);
  }

  async deployContract(_privateKey, progressCallBack) {
    const wallet = new ethers.Wallet(_privateKey, this.provider);
    
    const response = await axios({
      method: 'get',
      url: window.location.origin + '/eth/contract/get',
      responseType: 'json'
    });

    const contract = response.data;

    const byteCode = contract.bytecode;
    const abi = contract.abi;
    const deployTransaction = this.Contract.getDeployTransaction(byteCode, abi);
    deployTransaction.gasLimit = 4000000;

    try {
      progressCallBack('Sending Transaction...', null);
      const result = await wallet.sendTransaction(deployTransaction);
      progressCallBack('Transaction Sent!', result);
      const contractAddress = ethers.utils.getContractAddress(result);
      progressCallBack('Waiting for transaction to be mined...', contractAddress);
      const mineResult = await provider.waitForTransaction(result.hash);
      progressCallBack('SUCCESSFUL!', mineResult);
      this.contract = contractAddress;
    } catch (e) {
      console.log(e);
    }

    return this.contract;
  }
}

export default EthereumContractClient;