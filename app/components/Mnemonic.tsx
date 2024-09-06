"use client";
import { useState } from "react";
import { generateRandomMnemonic } from "../logic/mnemonics";

export function Mnemonic() {
    const [seedPhrase, setSeedPhrase] = useState("");
    
    const seedWords = seedPhrase.split(" ");
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4 text-center">Mnemonic Generator</h1>
            
            <button
                onClick={() => {
                    const seedPhrase1 = generateRandomMnemonic();
                    setSeedPhrase(seedPhrase1);
                    console.log(seedPhrase);
                    localStorage.setItem("seedPhrase", seedPhrase1 );
                    alert("Mnemonic generated");
                }}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
            >
                Generate Mnemonic
            </button>
            
            <div className="mb-4">
                {seedWords.length > 0 && (
                    <ul className="list-disc pl-5">
                        {seedWords.map((word, index) => (
                            <li key={index} className="text-gray-700 mb-1">{word}</li>
                        ))}
                    </ul>
                )}
            </div>
            
        </div>
    );
}
