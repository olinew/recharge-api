TokenController = () => {

    const Token = require('./TokenWrapper.js')
    const CONTRACT_ABI = require('./abis/r3fi.js');

    const r3fi = Token('0x13572851103bed49ff743af4c4bb5ace88b22e2f', CONTRACT_ABI, 'wss://mainnet.infura.io/ws/v3/4dd869b552454cc79348980651f943dd', '0x8929323F68D5Ed0D9Eb8E13b3670E7A7669355c6', 5000000);
    const br3fi = Token('0x4F55ab914CE8A633C7eb5d8b4D190A96E9ed7F90', CONTRACT_ABI, 'https://bsc-dataseed1.binance.org:443', '0x85eF9e6190dBb84144b98c03f61DE2B87f4c765B', 5000000);

    // Returns the supply of tokens available on the specified chain
    const getTokenCirculation = (Chain) => {
        if (Chain.toUpperCase() === 'BSC'){ return br3fi.getCirculation(); }
        if (Chain.toUpperCase() === 'ETH'){ return r3fi.getCirculation(); }
        return new Promise((resolve, reject) => {
            reject("Invalid chain selector");
        }); 

    };

    return {
        getTokenCirculation: getTokenCirculation
    };
};

module.exports = TokenController;
