// import * as dotenv from 'dotenv'
// dotenv.config()
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
	const apiKey = "API_KEY";
	const publicKey = "PUBLIC_KEY";
	const privateKey = "PRIVATE_KEY";
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
	  //const pathOnly = imagePath.replace(/^data:image\/\w+;base64,/, '');

	  console.log('Image Path: ' + pathOnly);
	  // Simuler le KYC réussi
	  let hash = await deployEncrypted(pathOnly);
	//   pushHash(hash, id);
	  console.log('KYC procedure completed successfully!');
	  console.log('Hash: ' + hash);
	} else {
	  // L'image est manquante, afficher un message d'erreur
	  console.log('Please select an image before starting the KYC procedure.');
	}
  };