"use client"
import { useState } from "react"
import { generateRandomMnemonic } from "../logic/mnemonics";

export function Mnemonic(){
    const [seedPhrase, setSeedPhrase] = useState("");

    const seedWords = seedPhrase.split(" ");
    return <div>
        <button onClick={()=>{
            setSeedPhrase(generateRandomMnemonic())
            console.log(seedPhrase);
            alert("button pressed")
        }}>Generate Mnemonic</button>
        
        <div>
            {
                seedWords.length>0 && (
                    <ul>
                        {
                            seedWords.map((word, index)=>(
                                <li key={index}>{word}</li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    </div>
}