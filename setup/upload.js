import * as dotenv from 'dotenv'
dotenv.config()
import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'

const signAuthMessage = async(publicKey, privateKey) =>{
	const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/b75053046af647a6af56da5f3efe35d1");
	const signer = new ethers.Wallet(privateKey, provider);
	const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
	const signedMessage = await signer.signMessage(messageRequested);
	return(signedMessage)
  }
  
  const deployEncrypted = async(path) =>{
	const apiKey = process.env.API_KEY;
	const publicKey = process.env.PUBLIC_KEY;
	const privateKey = process.env.PRIVATE_KEY;
	const signedMessage = await signAuthMessage(publicKey, privateKey);
  
	const response = await lighthouse.uploadEncrypted(
	  path,
	  apiKey,
	  publicKey,
	  signedMessage
	);
	//return Hash
	  return response.data.Hash;
  }
  
  export const beginKyc = async (imagePath, id) => {
    if (imagePath && id) {
      console.log('Image Path: ' + imagePath);
      // Simuler le KYC réussi
      let hash = await deployEncrypted(imagePath);
    //   pushHash(hash, id);
      console.log('KYC procedure completed successfully!');
      console.log('Hash: ' + hash);
      
    } else {
      // L'image est manquante, afficher un message d'erreur
      console.log('Please select an image before starting the KYC procedure.');
    }
  };