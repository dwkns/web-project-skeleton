(function () {
    'use strict';

    // source/js/helloWorld.js
    const helloWorld = 'The helloWorld module is working';

    // source/js/main.js
    const outputString = `Javascript Modules... ${helloWorld}`;
    document.getElementById('outputField').innerHTML = outputString;

}());
