'use strict';

module.exports = function (app){
    const context = require('aws-lambda-mock-context');
    const alexa = require('../AlexaHandler');
    // const volumeController = require('../controllers/VolumeController');

    app.get('/', function (req, res) {
        res.send('Welcome to Alexa remote control!');
    });

    app.post('/', function (req, res) {
        var ctx = context();
        alexa.handler(req.body, ctx);
        ctx.Promise
        .then(function(resp) {
            return res.status(200).json(resp); 
        })
        .catch(function(err) {  
            console.log('error');
        });
    });

    // app.get('/volumeup', volumeController.volumeUp);
    // app.get('/volumedown', volumeController.volumeDown);
};
