'use strict';

const RemoteController = require('../RemoteController');
const DECREASE_COMMANDS = ['lower', 'decrease'];
const INCREASE_COMMANDS = ['rise', 'increase']; 

function handleVolumeChange(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;
    const { intent } = requestEnvelope.request;
    const audioStatus = intent.slots.audioStatus;
    const audioLevel = intent.slots.audioLevel;
    const speechText = `Oh yeah! You have ${audioStatus.value} the volume by ${audioLevel.value}`;

    if (INCREASE_COMMANDS.includes(audioStatus.value)) {
        RemoteController.sendCommand(RemoteController.keys.VolumeUp, audioLevel.value);
    }
    else if (DECREASE_COMMANDS.includes(audioStatus.value)) {
        RemoteController.sendCommand(RemoteController.keys.VolumeDown, audioLevel.value);
    }
    return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
}

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'changeVolume';
    },
    handle(handlerInput) {
        handlerInput.context.succeed();
        return handleVolumeChange(handlerInput);
    }
};