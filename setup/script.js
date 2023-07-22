import readline from 'readline';
import { exec } from 'child_process';
import { generate } from 'random-words';
import chalk from 'chalk';
import axios from 'axios';

let network = "";
let rpc = "";
let password = "";
let user_name = "";
let photo_hash = "en attente";
let kyc = "non";

function selectClient() {
  
  const clients = [
    { name: "Pathfinder (Starknet)", rpcMethod: "starknet_blockNumber", number: 1 },
    { name: "Nethermind (Ethereum)", rpcMethod: "eth_blockNumber", number: 2 },
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

  rl.question(chalk.yellow(`\nOn which RPC port is the ${client.name} client running? (Provide the URL)\n`), (port) => {
    rpc = port;
    rl.close();
    checkRpcAPI(client, port);
  });
}

function checkRpcAPI(client, port) {
  const rpcUrl = `${port}`;
  const rpcCommand = `curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"${client.rpcMethod}","params":["latest"],"id":1}' ${rpcUrl}`;
  
  exec(rpcCommand, (error, stdout, stderr) => {
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

  rl.question(chalk.yellow('\nEnter an user_name and keep him in mind:\n'), (userInput) => {
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
    console.log(chalk.cyan("\nRandom words (password):"));
    console.log(chalk.green(`${words}`));
    console.log(chalk.yellow("\nPlease copy these words, keep them in mind, and download the application."));
    sendInformationToApi();
  } catch (error) {
    console.log(chalk.red(`\nAn error occurred while generating random words: ${error.message}`));
  }
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
  } catch (error) {
    console.log(`An error occurred while sending information to the API: ${error.message}`);
  }
}

selectClient();