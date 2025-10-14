import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { groq } from '@ai-sdk/groq';

export async function POST(req: Request) {
    try {
        const { prompt, model } = await req.json();

        let aiModel;
        if (model === "groq-ai") {
            aiModel = groq("llama3-8b-8192");
        } else {
            // Default to OpenAI if not specified or "open-ai"
            aiModel = openai("gpt-4.1-nano"); // cheapest model
            // aiModel = openai("gpt-4o-mini"); // more powerful mini version        
        }

        const { text } = await generateText({
            model: aiModel,
            prompt,
        });

        return Response.json({ text });

    } catch (error) {
        console.error("Error generating text: ", error);
        return Response.json({ error: "Failed to generate text" }, { status: 500 });
    }
}