const Web3 = require('web3')

module.exports = GatewayWrapper = (contractAddress, contractAbi, provider, totalSupply) => {

    const createW3Instance = () => {
        return new Web3(provider);
    };

    let web3 = createW3Instance();

    const createContractInstance = () => {
        return new web3.eth.Contract(contractAbi, contractAddress);
    };
    
    let contract = createContractInstance();

    const getCirculation = () => {
        return new Promise(resolve => {
            contract.methods.lockedTokens().call().then(result => {
                    let circulation = totalSupply - (parseInt(result)/1e9);
                    resolve(circulation);
                });
            });
        };

    return {
        getCirculation: getCirculation
    }

};