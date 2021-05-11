let Web3 = require('web3')

class TokenStats {

    constructor(contractAddress, contractAbi, provider, etherscanApiKey) {
        this.provider = provider;
        this.contractAddress = contractAddress;
        this.contractAbi = contractAbi;
        this.etherscanApiKey = etherscanApiKey;

        this.web3 = this.createW3Instance();
        this.contract = this.createContractInstance();
        
        // Eth gateway contract address
        this.gateway = "0x8929323F68D5Ed0D9Eb8E13b3670E7A7669355c6";

        // Total supply of R3charge tokens
        this.totalSupply = 5000000;
    };

    createW3Instance() {
        return new Web3(this.provider);
    };

    createContractInstance() {
        return new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
    };

    // Returns the supply of tokens available on the specified chain
    getCirculation(Chain) {
        return new Promise((resolve, reject) => {
            this.contract.methods.balanceOf(this.gateway).call().then(result => {
                if (Chain.toUpperCase() === 'BSC'){ 
                    let circulation = parseInt(result)/1e9;
                    resolve(circulation) }
                if (Chain.toUpperCase() === 'ETH'){
                    let circulation = this.totalSupply - parseInt(result)/1e9;
                    resolve(circulation)
                }
                else {
                    reject("Incorrect chain specifier")
                }
            }) 
        })
    };
}

module.exports = TokenStats;
