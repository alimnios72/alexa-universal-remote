'use strict';
//Change to Source handler
const RemoteController = require('../RemoteController');

function handleInputChange(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;
    const { intent } = requestEnvelope.request;
    const inputRow = intent.slots.inputRow;
    const speechText = `Roger that!`;

    RemoteController.sendCommand(RemoteController.keys.InputDialog);
    RemoteController.sendCommand(RemoteController.keys.Down);
    RemoteController.sendCommand(RemoteController.keys.Enter);
    return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
}

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'changeInput';
    },
    handle(handlerInput) {
        handlerInput.context.succeed();
        return handleInputChange(handlerInput);
    }
};