import readline from 'readline';
import { exec } from 'child_process';
import { generate } from 'random-words';
import chalk from 'chalk';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import clear from 'clear';
import { beginKyc } from './upload.js';
import { getIdByPassword } from './utils.js';

let network = "";
let rpc = "";
let password = "";
let user_name = "";
let photo_hash = "";
let kyc = "no";

function selectClient() {
  clear();
  const clients = [
    { name: "Pathfinder (Starknet)", rpcMethod: "starknet_blockNumber", number: 1 },
    { name: "Nethermind (Ethereum)", rpcMethod: "eth_blockNumber", number: 2 },
    { name: "Geth (Ethereum)", rpcMethod: "eth_blockNumber", number: 3},
    { name: "zkEVM Node (Polygon zkEVM)", rpcMethod: "eth_blockNumber", number: 4 },
    { name: "Geth (Linea)", rpcMethod: "eth_blockNumber", number: 5 },
    { name: "Nearcore (NEAR)", rpcMethod: "status", number: 6 },
    { name: "Geth (Celo)", rpcMethod: "eth_blockNumber", number: 7 },
    { name: "Nethermind (Gnosis Chain)", rpcMethod: "eth_blockNumber", number: 8 },

    // Add other clients to the list here
  ];

  console.log(chalk.cyan("Please select a client:"));
  clients.forEach((client, index) => {
    console.log(`(${index + 1}) ${client.name}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(chalk.yellow('\nEnter the number of the client you are using:\n'), (num) => {
    const selectedClient = clients[num - 1];
    if (selectedClient) {
      network = selectedClient.name;
      rl.close();
      getRpcPort(selectedClient);
    } else {
      console.log(chalk.red("Invalid client number. Please try again."));
      rl.close();
      selectClient();
    }
  });
}

function getRpcPort(client) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(chalk.yellow(`\nOn which RPC port is the ${client.name} client running? (Provide an http/https URL)\n`), (port) => {
    rpc = port;
    rl.close();
    checkRpcAPI(client, port);
  });
}

function checkRpcAPI(client, port) {
  const isAccessible = true;
  const rpcUrl = `${port}`;
  const httpCommand = `curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"${client.rpcMethod}","params":[],"id":1}' ${rpcUrl}`;
  const wssCommand = "al";

  exec(httpCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(chalk.red(`\nThe RPC API of ${client.name} is not accessible on port ${port}.`));
      return;
    }

    const responseData = JSON.parse(stdout);
    if (responseData && responseData.result) {
      console.log(chalk.green(`\nThe RPC API of ${client.name} is accessible on port ${port}.\n`));
      askUsername();
    } else {
      console.log(chalk.red(`\nThe RPC API of ${client.name} is not accessible on port ${port}.\n`));
    }
  });
}

function askUsername() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let local_user_name;

  rl.question(chalk.yellow('Enter an user_name and keep him in mind:\n'), (userInput) => {
    local_user_name = userInput;
    rl.close();
    user_name = local_user_name;
    generateRandomWords();
  });
}


async function generateRandomWords() {
  try {
    const words = generate(4).join(' ').toUpperCase();
    password = words;
    sendInformationToApi();
    chooseDox();
  } catch (error) {
    console.log(chalk.red(`\nAn error occurred while generating random words: ${error.message}`));
  }
}

function chooseDox() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(chalk.yellow("\nHow do you want to get DOXXED?"));
  console.log(chalk.cyan("\n(1) Upload a photo on Filecoin"));
  console.log(chalk.cyan("(2) Proof of Humanity through Worldcoin"));

  rl.question(chalk.green("Enter the number: "), (answer) => {
    const kycChoice = answer;
    console.log(chalk.blue("You chose: " + kycChoice));

    if (kycChoice == 1) {
      getPath(rl) // Pass the rl instance as an argument
        .then((imagePath) => {
          rl.close(); // Close the readline interface after getting the imagePath
          photo_hash = beginKyc(imagePath, password);
        })
        .catch((error) => {
          console.error(error);
          rl.close();
        });
    } else if (kycChoice == 2) {
      photo_hash = "0";
      console.log(chalk.yellow("WorldCoin is coming soon!"));
      rl.close();
    }
  });
}


function getPath(rl) {
  return new Promise((resolve, reject) => {
    rl.question(chalk.yellow("\nEnter the path of the image you want to upload:\n"), (userInput) => {
      if (!fs.existsSync(userInput)) {
        console.log(chalk.red("Error: The specified file does not exist."));
        return getPath(rl); // Rappeler la fonction pour obtenir un nouveau chemin
      }

      const fileExtension = path.extname(userInput).toLowerCase();
      if (fileExtension !== ".png" && fileExtension !== ".jpg" && fileExtension !== ".jpeg") {
        console.log(chalk.red("Error: The specified file is not an image (png, jpg, jpeg)."));
        return getPath(rl); // Rappeler la fonction pour obtenir un nouveau chemin
      }

      rl.close(); // Fermer l'interface readline après avoir obtenu l'entrée valide
      resolve(userInput); // Résoudre la promesse avec le chemin d'image valide
    });
  });
}

async function sendInformationToApi() {
  try {
    const response = await axios.post('http://5.196.27.86:3000/upload', {
      rpc: rpc,
      network: network,
      user_name: user_name,
      password: password,
      photo_hash: photo_hash,
      kyc: kyc
    });

    console.log(`Information sent to API. Response: ${response.data.message}`);
    console.log(chalk.cyan("\nRandom words (password):"));
    console.log(chalk.green(password));
    console.log(chalk.yellow("\nPlease copy these words, keep them in mind, and download the application."));
  } catch (error) {
    // Check if the error is a 400 error
    // if (error.response && error.response.status === 400) {
    //   console.log("\nAn error occurred: The RPC is a duplicate.");
    // } else {
    //   console.log(`\nAn error occurred while sending information to the API: ${error.message}`);
    //}
  }
}

selectClient();
