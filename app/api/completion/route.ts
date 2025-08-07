
import {generateText} from 'ai';
import {openai} from '@ai-sdk/openai';

export async function POST(){
    const {text} = await generateText({
        model:openai("gpt-4.1-nano"),
        prompt:"Explain what an LLM in simple terms",
    })
    return Response.json({text});
}