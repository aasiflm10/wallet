"use client"
import Image from "next/image";
import { Mnemonic } from "./components/Mnemonic";
import { useState } from "react";
import { generateRandomMnemonic } from "./logic/mnemonics";

export default function Home() {

  const [seedPhrase, setSeedPhrase] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(""); // State for selected wallet

  const [checkMnemonicButton, setcheckMneomicButton] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedWallet(event.target.value); // Update state with selected value
  };

  const handleGenerateMnemonic = () => {

    if (checkMnemonicButton) {
      const userConfirmed = window.confirm(
        "Do you really want to generate a new mnemonic? Note: The old mnemonic will be lost."
      );
      
      if (!userConfirmed) {
        return; // Exit the function if the user cancels
      }
    }
    const seedPhrase1 = generateRandomMnemonic();
    setSeedPhrase(seedPhrase1);
    console.log(seedPhrase);
    setcheckMneomicButton(true);
    localStorage.setItem("seedPhrase", seedPhrase1 );
  }
  const seedWords = seedPhrase.split(" ");
  return (

      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">Mnemonic Generator</h1>
          <div>{selectedWallet}</div>
          <button
              onClick={handleGenerateMnemonic}
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

          <div>

            
<h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Select SOL/ETH Wallet</h3>
<ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-license" type="radio" value="solana" name="list-radio" checked={selectedWallet === "solana"}
              onChange={handleRadioChange}
 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Solana </label>
        </div>
    </li>
    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div className="flex items-center ps-3">
            <input id="horizontal-list-radio-id" type="radio" value="ethereum" name="list-radio" checked={selectedWallet === "ethereum"}
              onChange={handleRadioChange}
 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ethereum</label>
        </div>
    </li>
    
</ul>

            <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
            >
            Generate Wallet
            </button>
          </div>
      </div>
      
  );
}
