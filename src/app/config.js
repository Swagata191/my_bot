import {createChatBotMessage} from 'react-chatbot-kit';

const config={
    botName:'Card Advisor',
    initialMessages:[
        createChatBotMessage("Hello! I'm a credit card advisor. How can I help you?")
    ]
}
export default config;