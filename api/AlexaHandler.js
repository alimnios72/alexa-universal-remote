'use strict';

const Alexa = require('ask-sdk-core');
const ChannelHandler = require('./handlers/ChannelHandler');
const InputHandler = require('./handlers/InputHandler');
const StatusHandler = require('./handlers/StatusHandler');
const VolumeHandler = require('./handlers/VolumeHandler');

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
        .addRequestHandlers(ChannelHandler)
        .addRequestHandlers(InputHandler)
        .addErrorHandlers(ErrorHandler)
        .create();
    }
    
    return skill.invoke(event, context);
}