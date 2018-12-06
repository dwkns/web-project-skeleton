(function () {
    'use strict';

    // source/js/helloWorld.js
    const helloWorld = 'is working the helloWorld module was imported';

    // source/js/main.js
    const outputString = `Javascript Modules... ${helloWorld}`;
    document.getElementById('outputField').innerHTML = outputString;

}());
