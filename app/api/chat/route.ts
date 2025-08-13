import { convertToModelMessages, UIMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req:Request){
    try{
        // handling array of messages instead of single prompt
        const {messages}: {messages: UIMessage[]} = await req.json();

        const result = streamText({
            model: openai("gpt-4.1-nano"),
            messages:convertToModelMessages(messages),
        });

        // add token tracking 
        result.usage.then((usage) =>{
            console.log({
                messageCount: messages.length,
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens,
            })
        })

        return result.toUIMessageStreamResponse();
    }catch(error){
        console.error("Error streaming chat completion: ", error);
        return new Response("Failed to stream chat completion", {status:500});
    }

}