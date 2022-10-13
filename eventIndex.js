/// <reference path="./HelperLib-master/src/index.d.ts" />

// Load node.js components.
const fs = require('node:fs');
const path = require('node:path');

let eventSetup = function() {

    //[] Loading Events
    // Load event information (name of the folder, file type)
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    // Load event js files and generate an array that contains the event files.
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventFile = require(filePath);

        eventFile.onEvent();
    }
}

// Decide which variables should be exported.
module.exports = {
    eventSetup
};