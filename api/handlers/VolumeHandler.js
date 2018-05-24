'use strict';

const RemoteController = require('../RemoteController');

function handleVolumeChange(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;
    const { intent } = requestEnvelope.request;
    const audioStatus = intent.slots.audioStatus;
    const audioLevel = intent.slots.audioLevel;
    const speechText = `<say-as interpret-as="interjection">Aww yeah.</say-as> You have ${audioStatus.value} the volume by <say-as interpret-as="ordinal">${audioLevel.value}</say-as>`;

    if (audioStatus.value === 'increase') {
        RemoteController.sendCommand(RemoteController.keys.VolumeUp, audioLevel.value);
    }
    else if (audioStatus.value === 'decrease') {
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