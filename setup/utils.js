import readline from 'readline';
import { exec } from 'child_process';
import { generate } from 'random-words';
import chalk from 'chalk';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import clear from 'clear';
import { beginKyc } from './upload.js';

export function getIdByPassword(password) {
	const postData = {
		password: password
	};
	const apiUrl = 'http://5.196.27.86:3000/get-id-by-password'; // Remplacez l'URL par la bonne URL si votre serveur tourne sur un autre port ou une autre adresse

	axios.post(apiUrl, postData)
	.then((response) => {
		console.log('Réponse du serveur :', response.data.id);
	})
	.catch((error) => {
		console.error('Erreur lors de l\'appel POST :', error.message);
	});

}