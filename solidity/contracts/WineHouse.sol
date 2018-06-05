pragma solidity ^0.4.21;

contract WineHouse {
    address public owner;
    mapping (string => WineData) private wines;
    mapping (address => bool) private trustedPartners;
    mapping (address => OwnerInfo) private wineOwners;
    string[] private wineIndices;
    
    constructor() public {
        owner = msg.sender;
    }
    
    struct OwnerInfo {
        string name;
        mapping (string => bool) wines;
        string[] ownedWines;
        bool isActive;
    }
    
    struct WineData {
        string cork;
        string capsule;
        string glass;
        string frontLabel;
        string backLabel;
        string bottle;
        address currentOwner;
        address[] ownerHistory;
        uint index;
        bool isActive;
    }
    
    modifier onlyMaster() {
        require(msg.sender == owner);
        _;
    }
    
    modifier onlyTrustedPartner() {
        require(trustedPartners[msg.sender] == true);
        _;
    }
    
    modifier onlyAssetOwner(string _uniqueIdentifier) {
        require(wineOwners[msg.sender].wines[_uniqueIdentifier] == true);
        _;
    }

    modifier wineShouldNotExist(string _uniqueIdentifier) {
        require(wines[_uniqueIdentifier].isActive == false);
        _;
    }

    modifier recipientShouldExist(address _recipient) {
        require(wineOwners[_recipient].isActive == true);
        _;
    }
    
    function getWineCount() view public returns (uint count) {
        return wineIndices.length;
    }

    function getOwnedWineCountOf(address _wineOwner) view public returns (uint) {
        return wineOwners[_wineOwner].ownedWines.length;
    }

    function getWineIdentifierAt(address _wineOwner, uint _index) view public returns (string) {
        return wineOwners[_wineOwner].ownedWines[_index];
    }

    function getOwnerHistoryAt(string _uniqueIdentifier, uint _index) view public returns (address) {
        return wines[_uniqueIdentifier].ownerHistory[_index];
    }

    event NewWineOwner(address _ownerAddress, string _name);
    event NewTrustedPartner(address _partnerAddress, string _name);
    event RemovedTrustedPartner(address _partnerAddress);
    event NewWine(string _uniqueIdentifier);
    event WineTransfer(address _to, string _uniqueIdentifier);
    
    // ===============================================================
    
    function registerWineOwner(
        address _ownerAddress, 
        string _name
        ) public onlyMaster
        returns (
            address, string, bool
        ) {
        
        wineOwners[_ownerAddress].name = _name;
        wineOwners[_ownerAddress].isActive = true;

        emit NewWineOwner(_ownerAddress, _name);

        return (
            _ownerAddress, 
            wineOwners[_ownerAddress].name, 
            wineOwners[_ownerAddress].isActive
        );

    }

    function getWineOwner(address _ownerAddress) view public returns (address, string, bool) {
        return (
            _ownerAddress,
            wineOwners[_ownerAddress].name,
            wineOwners[_ownerAddress].isActive
        );
    }
    
    function addTrustedPartner(address _partnerAddress, string _name) public onlyMaster returns (address, bool) {
        trustedPartners[_partnerAddress] = true;
        wineOwners[_partnerAddress].name = _name;
        wineOwners[_partnerAddress].isActive = true;
        registerWineOwner(_partnerAddress, _name);
        
        emit NewTrustedPartner(_partnerAddress, _name);

        return (_partnerAddress, trustedPartners[_partnerAddress]);
    }

    function getTrustedPartner(address _partner) view public returns (address, bool) {
        return (_partner, trustedPartners[_partner]);
    }
    
    function removeTrustedPartner(address _partner) public onlyMaster returns (address ,bool) {
        trustedPartners[_partner] = false;

        emit RemovedTrustedPartner(_partner);

        return (_partner, trustedPartners[_partner]);
    }
    
    function createWine(
        string _cork,
        string _capsule,
        string _glass,
        string _frontLabel,
        string _backLabel,
        string _bottle,
        string _uniqueIdentifier
    ) public onlyTrustedPartner wineShouldNotExist(_uniqueIdentifier)
        returns (
            uint index, 
            string uniqueIdentifier, 
            bool isActive
        ) {
        wines[_uniqueIdentifier].cork = _cork;
        wines[_uniqueIdentifier].capsule = _capsule;
        wines[_uniqueIdentifier].glass = _glass;
        wines[_uniqueIdentifier].frontLabel = _frontLabel;
        wines[_uniqueIdentifier].backLabel = _backLabel;
        wines[_uniqueIdentifier].bottle = _bottle;
        
        wines[_uniqueIdentifier].currentOwner = msg.sender;
        
        wines[_uniqueIdentifier].isActive = true;
        wines[_uniqueIdentifier].index = wineIndices.length;
        wineIndices.push(_uniqueIdentifier);
        wineOwners[msg.sender].wines[_uniqueIdentifier] = true;
        wineOwners[msg.sender].ownedWines.push(_uniqueIdentifier);

        emit NewWine(_uniqueIdentifier);
        
        return (wineIndices.length - 1, _uniqueIdentifier, wines[_uniqueIdentifier].isActive);
    }
    
    function transferWine(address _to, string _uniqueIdentifier) public onlyAssetOwner(_uniqueIdentifier) recipientShouldExist(_to) {
        wines[_uniqueIdentifier].ownerHistory.push(wines[_uniqueIdentifier].currentOwner);
        wines[_uniqueIdentifier].currentOwner = _to;

        uint totalElementCount = getOwnedWineCountOf(msg.sender);
        uint index = 0;
        for (index = 0; index <= totalElementCount; index++) {
            require(index != totalElementCount);
            if (keccak256(wineOwners[msg.sender].ownedWines[index]) == keccak256(_uniqueIdentifier)) {
                break;
            }
        }

        string storage lastElement = wineOwners[msg.sender].ownedWines[totalElementCount - 1];
        wineOwners[msg.sender].ownedWines[index] = lastElement;
        wineOwners[msg.sender].ownedWines.length = totalElementCount - 1;

        wineOwners[_to].ownedWines.push(_uniqueIdentifier);

        emit WineTransfer(_to, _uniqueIdentifier);
    }
    
    function retrieveWineData(string _uniqueIdentifier) view public 
        returns (
            string cork,
            string capsule,
            string glass,
            string frontLabel,
            string backLabel,
            string bottle,
            address currentOwner
        ) {
        return (
            wines[_uniqueIdentifier].cork,
            wines[_uniqueIdentifier].capsule,
            wines[_uniqueIdentifier].glass,
            wines[_uniqueIdentifier].frontLabel,
            wines[_uniqueIdentifier].backLabel,
            wines[_uniqueIdentifier].bottle,
            wines[_uniqueIdentifier].currentOwner
        );   
    }
}