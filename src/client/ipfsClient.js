/* global FileReader */
import IPFS from 'ipfs-api';
// const ipfs = new IPFS('/ip4/127.0.0.1/tcp/5001');
const ipfs =  new IPFS('ipfs.infura.io', '5001', {protocol: 'https'});

class IpfsClient {
  static path(hash) {
    // return 'http://localhost:8080/ipfs/' + hash;
    return `https://ipfs.infura.io:5001/api/v0/cat?arg=${hash}&stream-channels=true`;
  }

  upload(data, callback) {
    if (!data) {
      callback(false, 'Please select file to upload!');
      return;
    }

    let fileReader = new FileReader();
    fileReader.onload = async function () {
      let fileBuffer = Buffer.from(fileReader.result);

      ipfs.files.add(fileBuffer, (err, result) => {
        if (err) {
          callback(false, err);
          return;
        }

        if (result) {
          let ipfsHash = result[0].hash;
          callback(true, ipfsHash);
          return;
        }

        callback(false, 'Internal Error!');
      });
    };

    fileReader.readAsArrayBuffer(data);
  }
}

export default IpfsClient;