// source/js/main.js
import { helloWorld } from './helloWorld.js'; 

const outputString = `The module says... ${helloWorld}`;
document.getElementById('outputField').innerHTML = outputString;