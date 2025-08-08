"use client"

import {useState} from 'react';

export default function CompletionPage(){
    // const [state, action, pending] = useActionState(send, false);
    const [prompt, setPrompt] = useState(""); // user input 
    const [completion, setCompletion] = useState(""); // AI response 
    const [isLoading, setIsLoading] = useState(false); // loading flag
    const[error, setError] = useState <string | null> (null);

    const complete = async(e: React.FormEvent) =>{
        e.preventDefault();
        setIsLoading(true);
        setPrompt("");
        setError(null);

        try{
            const response = await fetch("/api/completion",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({prompt}),
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
        <div>
            <form onSubmit={complete}>
                <div>
                    <input
                        value = {prompt}
                        onChange= {(e) => setPrompt(e.target.value)}
                           placeholder='How can I help you'
                    />
                    <button type = "submit" disabled ={isLoading}> Send</button>

                </div>
            </form>
        </div>
    )
}