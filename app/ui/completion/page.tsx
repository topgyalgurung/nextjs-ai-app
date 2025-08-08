"use client"

import {useState} from 'react';

export default function CompletionPage(){
    // const [state, action, pending] = useActionState(send, false);
    const [prompt, setPrompt] = useState(""); // user input 
    const [completion, setCompletion] = useState(""); // AI response 
    const [isLoading, setIsLoading] = useState(false); // loading flag
    const [error, setError] = useState<string | null>(null);
    const [model, setModel] = useState("open-ai"); // default to OpenAI


    const complete = async(e: React.FormEvent) =>{
        e.preventDefault();
        setIsLoading(true);
        setPrompt("");
        setError(null);

        try{
            const response = await fetch("/api/completion",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ prompt, model }),

            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Something went wrong");
            }
            setCompletion(data.text);
        }catch(error){
            console.error("Error: ", error);
            setError(
                error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."
            );
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300 max-w-lg mx-auto">
                        {error}
                    </div>
                )}
                {completion && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg shadow p-4 mb-2 flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">AI</div>
                            <div className="whitespace-pre-line text-gray-900">{completion}</div>
                        </div>
                    </div>
                )}
                {isLoading && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg shadow p-4 flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">AI</div>
                            <div className="text-gray-500 animate-pulse">Loading ...</div>
                        </div>
                    </div>
                )}
            </div>
            <form
                onSubmit={complete}
                className="w-full max-w-2xl mx-auto px-4 py-3 bg-white border-t border-gray-200 flex items-end gap-2"
                style={{boxShadow: "0 -2px 8px rgba(0,0,0,0.03)"}}
            >
                <div className="flex-1 flex flex-col">
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="How can I help you"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"
                        autoFocus
                        disabled={isLoading}
                    />
                </div>
                {/* Cursor-style model selector */}
                <div className="relative flex flex-col items-center group">
                    <button
                        type="button"
                        className="flex items-center gap-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium cursor-pointer transition"
                        tabIndex={-1}
                    >
                        <span className="text-xs uppercase tracking-wider">
                            {model === "open-ai" ? "OpenAI" : "Groq AI"}
                        </span>
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className="absolute bottom-10 left-0 z-10 hidden group-hover:flex flex-col min-w-[140px] bg-white border border-gray-200 rounded-md shadow-lg">
                        <button
                            type="button"
                            className={`px-4 py-2 text-left hover:bg-blue-50 ${model === "open-ai" ? "font-semibold text-blue-700" : "text-gray-700"}`}
                            onClick={() => setModel("open-ai")}
                        >
                            OpenAI (Precise)
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-left hover:bg-blue-50 ${model === "groq-ai" ? "font-semibold text-blue-700" : "text-gray-700"}`}
                            onClick={() => setModel("groq-ai")}
                        >
                            Groq AI (Fast)
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="ml-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </form>
            <style jsx>{`
                .group:focus-within > div,
                .group:hover > div {
                    display: flex !important;
                }
            `}</style>
        </div>
    )
}
