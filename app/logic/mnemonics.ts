import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from 'bs58';



export function generateRandomMnemonic() : string
{
    const mnemonic = generateMnemonic();
    console.log(mnemonic);
    const seed = mnemonicToSeedSync(mnemonic);
    console.log(seed);

    const str = seed.toString("hex");
    console.log(str);

    return mnemonic;
}

export function getHexofMnemonic({mnemonic} : {mnemonic : string}) : string
{
    const seed = mnemonicToSeedSync(mnemonic);
    console.log(seed);

    const str = seed.toString("hex");
    console.log(str);

    return str;
}

export function getPublicAndPrivatekey({i, str} : {i : number, str: string}) : {privateKey : string, publicKey : string}
{
    const path = `m/44'/501'/${i}'/0'`;
    const derivedSeed = derivePath(path, str).key;
    console.log(derivedSeed);
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);
    const secretKey = keyPair.secretKey;
    const publicKey = keyPair.publicKey

    const secretKeyHex = Buffer.from(secretKey).toString("hex");
    const publicKeyHex = Buffer.from(publicKey).toString("hex");
    const publicKeyFromSecretKeyBase58 = Keypair.fromSecretKey(secretKey).publicKey.toBase58()
    const secretKeyBase58 = bs58.encode(secretKey);

    console.log("Hex : ")
    console.log("secret Key : "+secretKeyHex);
    console.log("public Key : " +publicKeyHex);

    console.log("bs58 : ")
    console.log("secret Key : "+secretKeyBase58);
    console.log("public Key : " +publicKeyFromSecretKeyBase58);

    return { privateKey : secretKeyBase58, publicKey : publicKeyFromSecretKeyBase58};
}