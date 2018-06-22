/* global window */
import ethers from 'ethers';
import axios from 'axios';

const providers = ethers.providers;
// const provider = new providers.JsonRpcProvider('http://127.0.0.1:8545'); 
const network = providers.networks.ropsten;
var provider = new providers.InfuraProvider(network);

class EthereumContractClient {
  constructor() {
    this.provider = provider;
  }

  async loadContractPrivate(contractAddress, privateKey) {
    const wallet = this.loadWallet(privateKey);
    const contract = await this.getContract();
    const abi = contract.abi;
    this.contract = new ethers.Contract(contractAddress, abi, wallet);
    return this.contract;
  }

  async loadContractPublic(contractAddress) {
    const contract = await this.getContract();
    const abi = contract.abi;
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
    return this.contract;
  }

  loadWallet(privateKey) {
    return new ethers.Wallet(privateKey, this.provider);
  }

  async getBalance(address) {
    const rawValue = await this.provider.getBalance(address);
    return ethers.utils.formatEther(rawValue);
  }

  async getContract() {
    const response = await axios({
      method: 'get',
      url: window.location.origin + '/eth/contract/get',
      responseType: 'json'
    });

    return response.data;
  }

  async deployContract(privateKey, progressCallBack) {
    const wallet = this.loadWallet(privateKey);
    
    const contract = await this.getContract();

    const byteCode = contract.bytecode;
    const abi = contract.abi;
    const deployTransaction = ethers.Contract.getDeployTransaction(byteCode, abi);
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