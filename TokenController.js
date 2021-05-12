const Web3 = require('web3')
const Contract = require('./Contract.js')


const TokenController {

    let r3fi = new Contract();
    let br3fi = new Contract();

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

module.exports = TokenController;
