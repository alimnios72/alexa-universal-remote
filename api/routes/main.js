'use strict';

module.exports = function (app){
    const alexaHandler = require('../AlexaHandler');
    const context = require('aws-lambda-mock-context');
    // const context = require('../LambdaMockContext');

    const ctx = context({
        timeout: 5
    });

    app.get('/', function (req, res) {
        res.send('Welcome to Alexa remote control!');
    });

    app.post('/', function (req, res) {
        alexaHandler.handler(req.body, ctx)
            .then(skillResponse => {
                return res.status(200).json(skillResponse)
            }
        );
    });
};
