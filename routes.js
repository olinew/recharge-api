module.exports = (app) => {

    const StatsController = require('./StatsController.js');
    const recharge = StatsController();

    app.route('/api/circulation/:chain').get(function (req, res) {
        recharge.getTokenCirculation(req.params.chain)
            .then(value => {
                res.status(200)
                if (req.query.format === 'text') {
                    res.setHeader('content-type', 'text/plain')
                    res.send(value.toString());
                } else {
                    res.json(value);
                };
            })
            .catch(Error => {
                res.status(400).json(Error)
            });
    });

    app.route('/api/transactions/:chain').get(function (req, res) {
        if (req.query.format === 'text') {
            res.setHeader('content-type', 'text/plain')
            res.send(recharge.GetTokenTransactions(req.params.chain));
        } else {
            res.json(recharge.GetTokenTransactions(req.params.chain));
        };
    });
};