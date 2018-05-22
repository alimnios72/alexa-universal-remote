'use strict';

const Alexa = require('ask-sdk-core');
const VolumeHandler = require('./handlers/VolumeHandler');
const StatusHandler = require('./handlers/StatusHandler');


const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
      handlerInput.context.fail();
  
      return handlerInput.responseBuilder
        .speak('Sorry, I can\'t understand the command. Please say again.')
        .reprompt('Sorry, I can\'t understand the command. Please say again.')
        .getResponse();
    },
  };

let skill;

exports.handler = async function (event, context) {
//   console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
        .addRequestHandlers(StatusHandler)
        .addRequestHandlers(VolumeHandler)
        .addErrorHandlers(ErrorHandler)
        .create();
    }
    
    return skill.invoke(event, context);
}