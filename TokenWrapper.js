const Web3 = require('web3')

class TokenWrapper {
    
    constructor(contractAddress, contractAbi, provider, gatewayAddress, totalSupply) {
        this.provider = provider;
        this.contractAddress = contractAddress;
        this.contractAbi = contractAbi;
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

    getCirculation() {
        return new Promise(resolve => {
            this.contract.methods.balanceOf(this.gateway).call().then(result => {
                    let circulation = this.totalSupply - parseInt(result)/1e9;
                    resolve(circulation)
                })
            }) 
        };
}

module.exports = TokenWrapper