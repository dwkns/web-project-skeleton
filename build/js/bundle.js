(function () {
    'use strict';

    // source/js/helloWorld.js
    const helloWorld = 'Well hello there...';

    // source/js/main.js
    const outputString = `The module says... ${helloWorld}`;
    document.getElementById('outputField').innerHTML = outputString;

}());
