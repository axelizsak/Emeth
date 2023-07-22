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
	const apiKey = "f7beb09f.84a518c0281340068f6733bc1b0b849a";
	const publicKey = "0x25ccb96c5678801b3bCcBF871F3Db98d040600aA";
	const privateKey = "0x9495be1aa9bd65de0c27f8256d63acedf194f75d6330e3e42cb6a96174b8b896";
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