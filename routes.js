module.exports = (app) => {

    const StatsController = require('./StatsController.js');
    const recharge = StatsController();

    app.route('/api/circulation/:chain').get(function (req, res) {
        recharge.getTokenCirculation(req.params.chain)
            .then(value => {
                res.status(200).json(value)
            })
            .catch(Error => {
                res.status(400).json(Error)
            });
    });
};