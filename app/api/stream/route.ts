import {streamText} from 'ai';
import {openai} from '@ai-sdk/openai';
// import {anthropic} from '@ai-sdk/anthropic'

// gpt-4.1 nano is the fastest, most cost-effective GPT-4.1 model


export async function POST(req:Request){
    try{
        const {prompt} = await req.json();
        const result = streamText({
            model:openai("gpt-4.1-nano"),
            // model:anthropic("claude-sonnet-4-20250514")

            prompt,
        });
        return result.toUIMessageStreamResponse();

    }catch(error){
        console.error("Error generating text: ", error);
        return new Response("Failed to generate text" ,{status: 500});
    }
}