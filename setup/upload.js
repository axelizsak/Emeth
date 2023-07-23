import * as dotenv from 'dotenv'
dotenv.config()
import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'
import axios from 'axios'
import chalk from 'chalk'
import {text} from './script.js'
import clear from 'clear'

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
	  return response.data.Hash;
  }

export const beginKyc = async (imagePath, id) => {
  if (imagePath && id) {
    clear();
    console.log(chalk.cyan("============================================================"));
    console.log(chalk.yellow(text));
    console.log(chalk.cyan("============================================================\n\n"));
    console.log(chalk.green('\nFound your picture at path: ' + imagePath));
    console.log("\n⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛⌛\n");
    // Simulate successful KYC
    let hash = await deployEncrypted(imagePath);
    clear();
    console.log(chalk.cyan("============================================================"));
    console.log(chalk.yellow(text));
    console.log(chalk.cyan("============================================================\n\n"));
    console.log(chalk.cyan('Your photo has been encrypted and stored on the Filecoin chain!'));
    console.log('\nHash: ' + hash);
    console.log('\n');
    console.log(chalk.cyan("============================================================"));
    console.log(chalk.green("\nYour KYC is being assessed ⌛. In the meantime, observe your peers in real time on our website!\n\n"));


    // Send the hash to the server
    axios.post('http://5.196.27.86:3000/upload', {
      rpc: 'rpc_value', // Replace with actual rpc value
      network: 'network_value', // Replace with actual network value
      user_name: 'username_value', // Replace with actual username value
      password: 'password_value', // Replace with actual password value
      photo_hash: hash,
      kyc: 'kyc_value' // Replace with actual kyc value
    }).then(response => {

    }).catch(error => {
      console.error(error);
      process.exit(1);
    });
  } else {
    // Image is missing, display an error message
    console.log('Please select an image before starting the KYC procedure.');
    process.exit(1);
  }
};

