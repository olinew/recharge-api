const Web3 = require('web3');

module.exports = TokenWrapper = (contractAddress, contractAbi, provider) => {
    
    const createW3Instance = () => {
        return new Web3(provider);
    };

    let web3 = createW3Instance();

    const createContractInstance = () => {
        return new web3.eth.Contract(contractAbi, contractAddress);
    };
    
    let contract = createContractInstance();
    
    return {}
};
