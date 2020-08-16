'use strict';

//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name
const appName = 'My Calculator';

//code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = 'Welcome to My calculator, you can say add two and five or multiply ten and fifteen';
        //welcome screen message
        let displayText = "Welcome to my calculator"
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

//implement custom handlers

const AddIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AddIntent'
    },
    handle(handlerInput) {
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;
        
        if (firstNumber && secondNumber){
            //perform the operations
            let result = parseInt(firstNumber) + parseInt(secondNumber);
            speechText = `The result of ${firstNumber} + ${secondNumber} is ${result}`;
            displayText = `${result}`;
            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName,displayText).withShouldEndSession(true).getResponse();
        } else {
            //ask for require input
            return handlerInput.responseBuilder.addDelegateDiretive(intent).getResponse();
        }
    }
}
const SubtractIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'SubtractIntent'
    },
    handle(handlerInput) {
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;
        
        if (firstNumber && secondNumber){
            //perform the operations
            let result = parseInt(secondNumber) - parseInt(firstNumber);
            speechText = `The result of ${secondNumber} minus ${firstNumber} is ${result}`;
            displayText = `${result}`;
            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName,displayText).withShouldEndSession(true).getResponse();
        } else {
            //ask for require input
            return handlerInput.responseBuilder.addDelegateDiretive(intent).getResponse();
        }
    }
}
//end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        let speechText = 'You can say add 3 and 5 or divide 50 by 2';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = 'Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

//Lambda handler function




//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         HelpIntentHandler,
                         AddIntentHandler,
                         SubtractIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
