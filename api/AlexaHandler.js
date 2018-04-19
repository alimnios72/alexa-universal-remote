'use strict';

const Alexa = require('alexa-sdk');
const fs = require('fs');
const volumeController = require('./controllers/VolumeController');

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = fs.readFileSync(__dirname + '/../APP_ID.txt', 'utf8');
    alexa.registerHandlers(handlers);
    alexa.execute();
}

const handlers = {
    'changeStatus': function() {
        console.log('###### Tried to change status ######');
        let slots = this.event.request.intent.slots;
        let speech = 'Sorry, could not handle request';
        if (slots.tvStatus.value === 'on') {
            speech = 'You got it, turning on T.V.';
        } else {
            speech = 'So sad, turning off T.V.';
        }
        this.emit(':tell', speech);
    },
    'changeVolume': function() {
        console.log('###### Tried to change volume ######');
        let speech = 'Sorry, could not handle request';
        let slots = this.event.request.intent.slots;
        if (slots.audioStatus.value === 'increase' || slots.audioStatus.value === 'raise') {
            speech = 'Ok, raising volume by ' + slots.audioLevel.value;
            volumeController.volumeUp(slots.audioLevel.value);
        }
        else if (slots.audioStatus.value === 'lower'|| slots.audioStatus.value === 'decrease') {
            speech = 'Ok, lowering volume by ' + slots.audioLevel.value;
            volumeController.volumeDown(slots.audioLevel.value);
        }
        
        this.emit(':tell', speech);
    } 
}