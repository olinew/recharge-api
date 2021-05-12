module.exports = (app) => {

    const TokenController = require('./TokenController.js');
    const CONTRACT_ABI = require('./abi/r3fi.js');
    const recharge = new TokenController('0x13572851103bed49ff743af4c4bb5ace88b22e2f', CONTRACT_ABI, 'wss://mainnet.infura.io/ws/v3/4dd869b552454cc79348980651f943dd');


    app.route('/api/circulation/:chain').get(function (req, res) {
        recharge.getCirculation(req.params.chain)
            .then(value => {
                res.status(200).json(value)
            }).catch(Error => {
                res.status(400).json(Error)
            });
    });
}