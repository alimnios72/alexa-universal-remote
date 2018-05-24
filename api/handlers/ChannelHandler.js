'use strict';

const RemoteController = require('../RemoteController');

function handleChannelChange(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;
    const { intent } = requestEnvelope.request;
    const channelDirection = intent.slots.channelDirection;
    const speechText = `Ok, my old friend`;

    if (channelDirection.value === 'up') {
        RemoteController.sendCommand(RemoteController.keys.ChannelUp);
    }
    else if (channelDirection.value === 'down') {
        RemoteController.sendCommand(RemoteController.keys.ChannelDown);
    }
    return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
}

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'changeChannel';
    },
    handle(handlerInput) {
        handlerInput.context.succeed();
        return handleChannelChange(handlerInput);
    }
};