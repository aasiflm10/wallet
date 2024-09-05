import Image from "next/image";
import { Mnemonic } from "./components/Mnemonic";

export default function Home() {

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <Mnemonic/>
    </div>
    
  );
}
