/**
 * Created by jorge on 4/1/18.
 */
'use strict';

module.exports = function (app){
    var volumeController = require('../controllers/VolumeController');

    app.get('/', function (req, res) {
        res.send('Welcome to Alexa remote control!');
    });

    app.post('/', function (req, res) {
       console.log(req);
    });

    app.get('/volumeup', volumeController.volumeUp);
    app.get('/volumedown', volumeController.volumeDown);
};
