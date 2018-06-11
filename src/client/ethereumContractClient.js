import ethers from 'ethers';
import axios from 'axios';

const providers = ethers.providers;
var provider = new providers.JsonRpcProvider('http://localhost:8545'); 

class EthereumContractClient {
  constructor() {
    this.provider = provider;
    this.Contract = ethers.Contract;
  }

  async getBalance(address) {
    const rawValue = await this.provider.getBalance(address);
    return ethers.utils.formatEther(rawValue);
  }

  async deployContract(_privateKey) {
    const wallet = new ethers.Wallet(_privateKey, this.provider);
    
    const contract = await axios.get('/eth/contract/get');

    const byteCode = contract.bytecode;
    const abi = contract.interface;

    const deployTransaction = this.Contract.getDeployTransaction(byteCode, abi);
    const result = await wallet.sendTransaction(deployTransaction);
    console.log('Transaction created!');
    console.log(result);
    console.log('====================================================');
    const contractAddress = ethers.utils.getContractAddress(result);
    console.log('Contract address:');
    console.log(contractAddress);
    const mineResult = await provider.waitForTransaction(result.hash);
    console.log(mineResult);
    this.contract = contractAddress;
    return contractAddress;
  }
}

export default EthereumContractClient;