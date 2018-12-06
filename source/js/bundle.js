// source/js/main.js

import { helloWorld } from './helloWorld.js'; 

const outputString = `Javascript Modules... <span class="testClass">${helloWorld}</span>`;
document.getElementById('outputField').innerHTML = outputString;