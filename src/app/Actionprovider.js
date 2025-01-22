import OpenAI from 'openai';

const openai=new OpenAI({
    apiKey:'b7005497556a4f95a9f54bec64b85aae',
    baseURL:'https://api.aimlapi.com',
    dangerouslyAllowBrowser:true
})

class ActionProvider{
    createChatBotMessage
    SetState
    createClientMessage
    stateRef
    createCustomMessage 

    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    )
    {
        this.createChatBotMessage=createChatBotMessage;
        this.SetState=setStateFunc;
        this.createClientMessage=createClientMessage;
        this.stateRef=stateRef;
        this.createCustomMessage=createCustomMessage
    }

    callGenAI = async (prompt) => {
        const chatCompletion = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages:[
                {role:"system",content:"You are a credit card advisor for the Indian market"},
                {role:'user',content:prompt}
            ],
            temperature:0.5,
            max_tokens:50
        });
        return chatCompletion.choices[0].message.content;
    } 

    timer = ms => new Promise(res=>setTimeout(res,ms));

    generateResponseMessage = async (userMessage) => {
        const responseFromGPT = await this.callGenAI(userMessage);
        let message;
        let numberNoLine=responseFromGPT.split('\n').length;
        for(let i=0;i<numberNoLine;i++){
            const msg=responseFromGPT.split('\n')[i];
            if(msg.length){
                console.log('KW101',msg);
                message=this.createChatBotMessage(msg);
                this.updateChatBotMessage(message);
            }
            await this.timer(1000);
        }
    }
    respond = (message) => {
        this.generateResponseMessage(message);
    }
    updateChatBotMessage = (message) => {
        this.SetState(prevState => ({
            ...prevState,messages:[...prevState.messages,message]       
        }))
    }
}
export default ActionProvider;