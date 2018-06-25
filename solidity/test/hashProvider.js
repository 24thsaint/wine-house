const { utils } = require('ethers');

class HashProvider {
  static getWineIdentifier(wineData) {
    const { cork, capsule, glass, frontLabel, backLabel, bottle } = wineData;
    var utf8Bytes = utils.toUtf8Bytes(`${backLabel}|${bottle}|${capsule}|${cork}|${frontLabel}|${glass}`);
    const wineIdentifier = utils.keccak256(utf8Bytes);
    const normalizedWineIdentifier = '0x' + wineIdentifier.substring(2).toUpperCase();
    return normalizedWineIdentifier;
  }
}

module.exports = HashProvider;