// Decrypt file nodejs
import fs from "fs"
import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const signAuthMessage = async(publicKey, privateKey) =>{
  const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/b75053046af647a6af56da5f3efe35d1");
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const decrypt = async() =>{
  const cid = "QmNf3SwpJUsHaLfUJH3Y1kE8Rny1hYeFmQhUh6HgBfbKuF";
  const publicKey = process.env.PUBLIC_KEY;
  const privateKey = process.env.PRIVATE_KEY;

  // Get file encryption key
  const signedMessage = await signAuthMessage(publicKey, privateKey);
  const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  );

  // Decrypt File
  const decrypted = await lighthouse.decryptFile(
    cid,
    fileEncryptionKey.data.key
  );

  // Save File
  fs.createWriteStream("fileName.png").write(Buffer.from(decrypted))  
}

decrypt()