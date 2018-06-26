import settings from './settings';
import EthereumContract from '../ethereumContractClient';

class UserStatus {
  static async getStatus(walletAddress) {
    const ethereumContract = new EthereumContract();
    try {
      const contractAddress = await settings.get('contractAddress');
      const contract = await ethereumContract.loadContractPublic(contractAddress);
      const isMaster = await contract.owner();
      if (isMaster.toUpperCase() === '0X' + walletAddress.toUpperCase()) {
        return 'master';
      }
  
      const isPartner = await contract.getTrustedPartner(walletAddress);
      if (isPartner[1]) {
        return 'partner';
      }
  
      const isOwner = await contract.getWineOwner(walletAddress);
      if (isOwner[2]) {
        return 'owner';
      }
  
      return 'unverified';
    } catch (e) {
      return false;
    }
  }

  static getDescription(status) {
    switch(status) {
    case 'master': return 'Contract Master';
    case 'partner': return 'Registered Partner';
    case 'owner': return 'Registered Owner';
    default: return 'Unverified User';
    }
  }
}

export default UserStatus;