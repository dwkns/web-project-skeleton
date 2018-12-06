(function () {
    'use strict';

    // source/js/helloWorld.js
    const helloWorld = 'is working. The helloWorld module was imported.';

    // source/js/main.js
    const outputString = `Javascript Modules... <span class="testClass">${helloWorld}</span>`;
    document.getElementById('outputField').innerHTML = outputString;

}());
