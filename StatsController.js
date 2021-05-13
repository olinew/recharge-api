const TokenWrapper      = require('./wrappers/TokenWrapper.js')
const GatewayWrapper    = require('./wrappers/GatewayWrapper.js');
const TokenAbi          = require('./abis/tokenAbi.js');
const GatewayAbi        = require('./abis/gatewayAbi.js')

module.exports = StatsController = () => {

    const r3fiAddress       = '0x13572851103bed49ff743af4c4bb5ace88b22e2f';
    const ethProvider       = 'wss://mainnet.infura.io/ws/v3/4dd869b552454cc79348980651f943dd';
    const ethGatewayAddress = '0x8929323F68D5Ed0D9Eb8E13b3670E7A7669355c6';

    const bR3fiAddress      = '0x4F55ab914CE8A633C7eb5d8b4D190A96E9ed7F90';
    const bscProvider       = 'https://bsc-dataseed1.binance.org:443';
    const bscGatewayAddress = '0x85eF9e6190dBb84144b98c03f61DE2B87f4c765B';

    const totalSupply       = 5000000;

    let r3fi                = TokenWrapper(r3fiAddress, TokenAbi, ethProvider, ethGatewayAddress);
    let br3fi               = TokenWrapper(bR3fiAddress, TokenAbi, bscProvider, bscGatewayAddress);

    let r3fi_gateway        = GatewayWrapper(ethGatewayAddress, GatewayAbi, ethProvider, totalSupply);
    let bR3fi_gateway       = GatewayWrapper(bscGatewayAddress, GatewayAbi, bscProvider, totalSupply);

    // Returns the supply of tokens available on the specified chain
    const getTokenCirculation = (Chain) => {
        if (Chain.toUpperCase() === 'BSC'){ return bR3fi_gateway.getCirculation(); }
        if (Chain.toUpperCase() === 'ETH'){ return r3fi_gateway.getCirculation(); }
        return new Promise((resolve, reject) => { reject("Invalid chain selector"); }); 
    };

    return {
        getTokenCirculation: getTokenCirculation
    };
};
