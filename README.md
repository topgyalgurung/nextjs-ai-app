# AI Text Completion in Next.js

**GitHub:** [Next.js AI Tutorials](https://github.com/gopinav/Next.js-AI-Tutorials)

A Next.js project demonstrating AI-powered text completion and chat interactions using the **Vercel AI SDK** and **OpenAI API**. The project includes real-time text streaming, conversation history, and multi-model support.

#### Tech Stack
- Frontend: Next.js, React, TypeScript
- AI SDK: Vercel AI SDK, OpenAI API
- Other Tools: REST API, Streaming Responses, useChat Hooks

---

## Features

- AI SDK integration with its 3 main parts:
  - **Core**
  - **UI Hooks**
  - **Experimental RSC**
- Real-time text streaming instead of waiting for the full response
- Support for multiple AI models (LLMs, embeddings, image, multimodal)
- Chat system with conversation history, route handler, and token tracking
- Prompt engineering and token optimization for performance and cost efficiency

---

## Project Setup

1. Clone the repository:

```bash
git clone https://github.com/gopinav/Next.js-AI-Tutorials.git
cd Next.js-AI-Tutorials
```

2. Install dependencies
```bash
npm install
```

3. Configure your environment variables for OpenAI API keys and any other required credentials.

----

#### Generate Text
- Use the AI SDK to generate text programmatically.
- Streaming responses show text as soon as AI starts generating it, improving user experience.

#### Stream Text
- Instead of waiting for the entire response, start showing text as soon as AI starts generating it.

### AI Models and Providers

#### Types of Models
1. Text Generation Models (LLMs): GPT-4, Claude, Gemini
2. Embedding Models: Convert text into numeric vectors
3. Image Models: MidJourney, DALL-E, Flux
4. Multi-modal Models: GPT-4, Claude-4, Gemini

#### Model Characteristics
- Context Window: How much the model can remember in one session
- Intelligence: Quality of generated responses
- Speed: Response time
- Cost: API usage pricing

#### Providers
- OpenAI
- Anthropic
- Google

#### Tokens
- Tokens are the basic unit of text processed by the model (words, subwords, or characters).
- Tokens determine:
- How much text can be processed at once
- API usage cost
- Output quality
- Context Window: Short-term memory for a conversation

Example usage: 
```javascript

result.usage.then((usage) => {
  console.log({
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    totalTokens: usage.totalTokens,
  });
});
```
Note: Token counts from the console may differ from the tokenizer due to SDK system formatting and context inclusion.

More info: [OpenAI Tokenizer](https://platform.openai.com/tokenizer)

#### Chat with AI
- AI models do not have memory by default. Maintain ordered conversation history and send it with every new prompt.
- Chat system components:
- Route handler to communicate with AI while maintaining history
- Chat UI with message display
- Token tracking to monitor usage
- Client uses a controlled input form; useChat hook manages conversation streaming and state.
- POST route handler extracts message from req.body, converts it to model format, and streams the response.

#### Prompt Engineering

I built an AI-powered text completion feature in Next.js using the Vercel AI SDK and OpenAI API, focusing on real-time text generation and chat interaction.
- Project covered setup, token management, and integrating AI SDK’s three core parts: Core, UI hooks, and experimental RSC
- Implemented streaming responses so text appears as the model generates it
- Explored different model types (LLMs, embeddings, image, multimodal), providers, and token usage to optimize cost and performance
- Built a chat system with conversation history, a route handler for API requests, token tracking, and a responsive chat UI powered by useChat.