"use client"

import { useState } from "react";
import { generateRandomMnemonic, getHexofMnemonic, getPublicAndPrivatekeyEth, getPublicAndPrivatekeySol } from "./logic/mnemonics";

type Keys = {
  privateKey : string,
  publicKey : string
}

export default function Home() {

  const [seedPhrase, setSeedPhrase] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(""); // State for selected wallet
  const [count, setCount] = useState(0);
  const [checkMnemonicButton, setcheckMneomicButton] = useState(false);
  const [wallets, setWallets] = useState<Array<Keys>>([]);

  const handleRadioChange = (event : React.ChangeEvent<HTMLInputElement>) => {
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

  const handleGenerateWallet = () => {
    const hexMnemonic = getHexofMnemonic(seedPhrase);
    var KeyPair : Keys = {
      privateKey : "",
      publicKey : ""
    }
    if(selectedWallet === "solana")
    {
      KeyPair = getPublicAndPrivatekeySol({i : count, str : hexMnemonic})
    }
    else if(selectedWallet === "ethereum")
    {
      KeyPair = getPublicAndPrivatekeyEth({i : count, str : hexMnemonic})
    }
    else
    {
      alert("Plzz select wallet for either solana or eth");
      return;
    }

    if(KeyPair.privateKey != "")
    {
      wallets.push(KeyPair);
      setCount(count+1);
    }
    else
    {
      return;
    }
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
                onClick={handleGenerateWallet}
            >
            Generate Wallet
            </button>

            <br/>
            <div>
              {
                wallets.map((key, index) => (
                  <div key={index}>
                    

                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Wallet Number {index+1}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{key.privateKey}</p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{key.publicKey}</p>
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Send Money
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>

                  </div>
                ))
              }
            </div>
          </div>
      </div>
      
  );
}
