/* global artifacts, contract, assert */
const faker = require('faker');
const crypto = require('crypto');
const WineHouse = artifacts.require('./WineHouse.sol');

contract('WineHouse', function (accountAddresses) {
  let wineHouse;

  beforeEach(async function () {
    wineHouse = await WineHouse.new();
  });

  it('Deploys the contract with the expected owner', async function () {
    const expectedOwner = accountAddresses[0];

    const actualOwner = await wineHouse.owner();
    return assert.equal(expectedOwner, actualOwner);
  });

  it('Registers a partner', async function () {
    const partnerAccount = accountAddresses[1];
    const partnerName = 'SM City Supermarket, Iloilo';
    const identityHash = faker.random.alphaNumeric(32);
    await wineHouse.addTrustedPartner(partnerAccount, partnerName, identityHash);
    const partnerResponse = await wineHouse.getTrustedPartner(partnerAccount);
    assert.equal(partnerAccount, partnerResponse[0]);
    assert.equal(true, partnerResponse[1]);
  });

  it('Removes a registered partner', async function () {
    const partnerAccount = accountAddresses[1];
    const partnerName = 'SM City Supermarket, Iloilo';
    const identityHash = faker.random.alphaNumeric(32);
    await wineHouse.addTrustedPartner(partnerAccount, partnerName, identityHash);
    const partnerResponse = await wineHouse.getTrustedPartner(partnerAccount);
    assert.equal(partnerAccount, partnerResponse[0]);
    assert.equal(true, partnerResponse[1]);
    await wineHouse.removeTrustedPartner(accountAddresses[1]);
    const removedPartnerResponse = await wineHouse.getTrustedPartner(partnerAccount);
    assert.equal(partnerAccount, removedPartnerResponse[0]);
    assert.equal(false, removedPartnerResponse[1]);
  });

  it('Registers a wine owner', async function () {
    const ownerName = 'Rave Arevalo';
    const identityHash = faker.random.alphaNumeric(32);
    await wineHouse.registerWineOwner(accountAddresses[1], ownerName, identityHash);
    const wineOwnerResponse = await wineHouse.getWineOwner(accountAddresses[1]);

    assert.equal(accountAddresses[1], wineOwnerResponse[0]);
    assert.equal(ownerName, wineOwnerResponse[1]);
    assert.equal(true, wineOwnerResponse[2]);
  });

  it('Creates a new wine', async function () {
    await wineHouse.addTrustedPartner(accountAddresses[0], 'Rave Arevalo', faker.random.alphaNumeric(32));

    const wineData = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier = crypto.createHash('sha256').update(JSON.stringify(wineData)).digest('hex');
    wineData.uniqueIdentifier = uniqueIdentifier;
    await wineHouse.createWine(
      wineData.cork,
      wineData.capsule,
      wineData.glass,
      wineData.frontLabel,
      wineData.backLabel,
      wineData.bottle,
      uniqueIdentifier
    );

    const retrievedWine = await wineHouse.retrieveWineData(uniqueIdentifier);

    assert.equal(retrievedWine[0], wineData.cork);
    assert.equal(retrievedWine[1], wineData.capsule);
    assert.equal(retrievedWine[2], wineData.glass);
    assert.equal(retrievedWine[3], wineData.frontLabel);
    assert.equal(retrievedWine[4], wineData.backLabel);
    assert.equal(retrievedWine[5], wineData.bottle);
    assert.equal(retrievedWine[6], accountAddresses[0]);
  });

  it('Retrieves the owner history count of a wine', async function() {
    await wineHouse.addTrustedPartner(accountAddresses[0], 'Rave Arevalo', faker.random.alphaNumeric(32));
    await wineHouse.registerWineOwner(accountAddresses[1], 'Tristan Macadangdang', faker.random.alphaNumeric(32));

    const wineData = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier = crypto.createHash('sha256').update(JSON.stringify(wineData)).digest('hex');
    wineData.uniqueIdentifier = uniqueIdentifier;
    await wineHouse.createWine(
      wineData.cork,
      wineData.capsule,
      wineData.glass,
      wineData.frontLabel,
      wineData.backLabel,
      wineData.bottle,
      uniqueIdentifier
    );

    const historyCountZero = await wineHouse.getOwnerHistoryCountOf(uniqueIdentifier);
    assert.equal(historyCountZero.toNumber(), 0);

    await wineHouse.transferWine(accountAddresses[1], uniqueIdentifier);

    const historyCount = await wineHouse.getOwnerHistoryCountOf(uniqueIdentifier);
    assert.equal(historyCount.toNumber(), 1);
  });

  it('Transfers a wine from an owner to an address', async function () {
    await wineHouse.addTrustedPartner(accountAddresses[0], 'Rave Arevalo', faker.random.alphaNumeric(32));
    await wineHouse.registerWineOwner(accountAddresses[1], 'Pia Bonilla', faker.random.alphaNumeric(32));

    const wineData = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier = crypto.createHash('sha256').update(JSON.stringify(wineData)).digest('hex');
    wineData.uniqueIdentifier = uniqueIdentifier;
    await wineHouse.createWine(
      wineData.cork,
      wineData.capsule,
      wineData.glass,
      wineData.frontLabel,
      wineData.backLabel,
      wineData.bottle,
      uniqueIdentifier
    );

    await wineHouse.transferWine(accountAddresses[1], uniqueIdentifier);
    const result = await wineHouse.retrieveWineData(uniqueIdentifier);
    const ownerHistory = await wineHouse.getOwnerHistoryAt(uniqueIdentifier, 0);

    assert.equal(ownerHistory, accountAddresses[0]);
    assert.equal(result[6], accountAddresses[1]);
  });

  it('Should retrieve a wine count of 2', async function() {
    await wineHouse.addTrustedPartner(accountAddresses[0], 'Rave Arevalo', faker.random.alphaNumeric(32));

    const wineData1 = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };
    const wineData2 = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier1 = crypto.createHash('sha256').update(JSON.stringify(wineData1)).digest('hex');
    const uniqueIdentifier2 = crypto.createHash('sha256').update(JSON.stringify(wineData2)).digest('hex');
    wineData1.uniqueIdentifier = uniqueIdentifier1;
    wineData2.uniqueIdentifier = uniqueIdentifier2;

    await wineHouse.createWine(
      wineData1.cork,
      wineData1.capsule,
      wineData1.glass,
      wineData1.frontLabel,
      wineData1.backLabel,
      wineData1.bottle,
      uniqueIdentifier1
    );

    await wineHouse.createWine(
      wineData2.cork,
      wineData2.capsule,
      wineData2.glass,
      wineData2.frontLabel,
      wineData2.backLabel,
      wineData2.bottle,
      uniqueIdentifier2
    );

    const result = (await wineHouse.getWineCount()).toNumber();
    assert.equal(result, 2);
  });

  it('Should return the correct wine identifier from the collection of a wine owner', async function() {
    await wineHouse.addTrustedPartner(accountAddresses[0], 'Rave Arevalo', faker.random.alphaNumeric(32));

    const wineData = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier = crypto.createHash('sha256').update(JSON.stringify(wineData)).digest('hex');
    wineData.uniqueIdentifier = uniqueIdentifier;

    await wineHouse.createWine(
      wineData.cork,
      wineData.capsule,
      wineData.glass,
      wineData.frontLabel,
      wineData.backLabel,
      wineData.bottle,
      uniqueIdentifier
    );

    const result = await wineHouse.getWineIdentifierAt(accountAddresses[0], 0);
    assert(result, uniqueIdentifier);
  });

  it('Should disallow transfer of unowned wine', async function() {
    await wineHouse.addTrustedPartner(accountAddresses[0], 'Rave Arevalo', faker.random.alphaNumeric(32));
    await wineHouse.registerWineOwner(accountAddresses[1], 'Pia Bonilla', faker.random.alphaNumeric(32));

    const wineData = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier = crypto.createHash('sha256').update(JSON.stringify(wineData)).digest('hex');
    wineData.uniqueIdentifier = uniqueIdentifier;
    await wineHouse.createWine(
      wineData.cork,
      wineData.capsule,
      wineData.glass,
      wineData.frontLabel,
      wineData.backLabel,
      wineData.bottle,
      uniqueIdentifier
    );

    try {
      await wineHouse.transferWine(accountAddresses[0], uniqueIdentifier, {from: accountAddresses[1]});
    } catch (e) {
      assert.equal(e.message, 'VM Exception while processing transaction: revert');
    }
  });

  it('Should disallow wine creation from an untrusted partner', async function() {
    const wineData = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier = crypto.createHash('sha256').update(JSON.stringify(wineData)).digest('hex');
    wineData.uniqueIdentifier = uniqueIdentifier;
    try {
      await wineHouse.createWine(
        wineData.cork,
        wineData.capsule,
        wineData.glass,
        wineData.frontLabel,
        wineData.backLabel,
        wineData.bottle,
        uniqueIdentifier
      );
    } catch (e) {
      assert.equal(e.message, 'VM Exception while processing transaction: revert');
    }
  });

  it('Should disallow trusted partner registration from a non-master', async function() {
    const partnerAccount = accountAddresses[1];
    const partnerName = 'SM City Supermarket, Iloilo';
    const identityHash = faker.random.alphaNumeric(32);
    try {
      await wineHouse.addTrustedPartner(partnerAccount, partnerName, identityHash, {from: accountAddresses[2]});
    } catch (e) {
      assert.equal(e.message, 'VM Exception while processing transaction: revert');
    }
  });

  it('Should disallow wine owner registration from a non-master', async function () {
    const ownerName = 'Rave Arevalo';
    const identityHash = faker.random.alphaNumeric(32);
    try {
      await wineHouse.registerWineOwner(accountAddresses[1], ownerName, identityHash, {from: accountAddresses[1]});
    } catch (e) {
      assert.equal(e.message, 'VM Exception while processing transaction: revert');
    }
  });

  it('Should disallow removal of a trusted partner from a non-master', async function() {
    const partnerAccount = accountAddresses[1];
    const partnerName = 'SM City Supermarket, Iloilo';
    const identityHash = faker.random.alphaNumeric(32);
    await wineHouse.addTrustedPartner(partnerAccount, partnerName, identityHash);
    const partnerResponse = await wineHouse.getTrustedPartner(partnerAccount);
    assert.equal(partnerAccount, partnerResponse[0]);
    assert.equal(true, partnerResponse[1]);
    try {
      await wineHouse.removeTrustedPartner(accountAddresses[1], {from: accountAddresses[2]});
    } catch (e) {
      assert.equal(e.message, 'VM Exception while processing transaction: revert');
    }
  });

  it('Should disallow creation of a new wine with duplicate unique identifier', async function () {
    await wineHouse.addTrustedPartner(accountAddresses[0], 'Rave Arevalo', faker.random.alphaNumeric(32));

    const wineData = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier = crypto.createHash('sha256').update(JSON.stringify(wineData)).digest('hex');
    wineData.uniqueIdentifier = uniqueIdentifier;
    await wineHouse.createWine(
      wineData.cork,
      wineData.capsule,
      wineData.glass,
      wineData.frontLabel,
      wineData.backLabel,
      wineData.bottle,
      uniqueIdentifier
    );

    try {
      await wineHouse.createWine(
        wineData.cork,
        wineData.capsule,
        wineData.glass,
        wineData.frontLabel,
        wineData.backLabel,
        wineData.bottle,
        uniqueIdentifier
      );
    } catch (e) {
      assert.equal(e.message, 'VM Exception while processing transaction: revert');
    }
  });

  it('Should disallow transfer of wine from an unverified owner', async function() {
    await wineHouse.addTrustedPartner(accountAddresses[0], 'Rave Arevalo', faker.random.alphaNumeric(32));    

    const wineData = {
      cork: faker.random.words(5),
      capsule: faker.random.words(5),
      glass: faker.random.words(5),
      frontLabel: faker.random.words(5),
      backLabel: faker.random.words(5),
      bottle: faker.random.words(5)
    };

    const uniqueIdentifier = crypto.createHash('sha256').update(JSON.stringify(wineData)).digest('hex');
    wineData.uniqueIdentifier = uniqueIdentifier;
    await wineHouse.createWine(
      wineData.cork,
      wineData.capsule,
      wineData.glass,
      wineData.frontLabel,
      wineData.backLabel,
      wineData.bottle,
      uniqueIdentifier
    );

    await wineHouse.transferWine(accountAddresses[1], uniqueIdentifier);

    try {
      await wineHouse.transferWine(accountAddresses[2], uniqueIdentifier, {from: accountAddresses[1]});
    } catch (e) {
      assert.equal(e.message, 'VM Exception while processing transaction: revert');
    }
  });
});