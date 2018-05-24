'use strict';

const RemoteController = require('../RemoteController');

function handleStatusChange(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;
    const { intent } = requestEnvelope.request;
    const tvStatus = intent.slots.tvStatus;
    let speechText;

    if (tvStatus.value === 'on'){
        speechText = `You got it, <say-as interpret-as="interjection">bitsh</say-as>`;
    }
    else if (tvStatus.value === 'off') {
        speechText = `Smell you later, <emphasis level="strong">sucker!</emphasis>`;
    }
    RemoteController.sendCommand(RemoteController.keys.Power);
   
    return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
}

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'changeStatus';
    },
    handle(handlerInput) {
        handlerInput.context.succeed();
        return handleStatusChange(handlerInput);
    }
}