class Contract {
    constructor(contractAddress, contractAbi, provider, scanApiKey, gatewayAddress, totalSupply) {
        this.provider = provider;
        this.contractAddress = contractAddress;
        this.contractAbi = contractAbi;
        this.scanApiKey = scanApiKey;
        this.gateway = gatewayAddress;
        this.totalSupply = totalSupply;

        this.web3 = this.createW3Instance();
        this.contract = this.createContractInstance();
    };
 
    createW3Instance() {
        return new Web3(this.provider);
    };

    createContractInstance() {
        return new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
    };
}