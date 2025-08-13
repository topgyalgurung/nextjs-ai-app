"use client";

// using just open ai model for now here 

import { useCompletion } from "@ai-sdk/react";

export default function CompletionStreamPage() {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    setInput,
  } = useCompletion({
    api: "/api/stream",
  });

  return (
        <div className="flex flex-col h-screen bg-gray-100">

     {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300 max-w-lg mx-auto">
                        {error.message}
                    </div>
                )}
      {isLoading && !completion && <div>Loading...</div>}

      {completion && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg shadow p-4 mb-2 flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">AI</div>
                            <div className="whitespace-pre-line text-gray-900">{completion}</div>
                        </div>
                    </div>
                )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput(""); // temporary fix to clear the input after submission
          handleSubmit(e);
        }}
                className="w-full max-w-2xl mx-auto px-4 py-3 bg-white border-t border-gray-200 flex items-end gap-2"

      >
        <div className="flex flex-1 flex-col gap-2">
          <input
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900"

            value={input}
            onChange={handleInputChange}
            placeholder="How can I help you?"
          />
          {isLoading ? (
            <button
              onClick={stop}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}