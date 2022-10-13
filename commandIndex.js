/// <reference path="./HelperLib-master/src/index.d.ts" />

// Load node.js components.
const fs = require('node:fs');
const path = require('node:path');

let commandSetup = function() {

    //[] Loading Commands
    // Load command information (name of the folder, file type)
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    // Load command js files and generate an array that contains the command files.
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandFile = require(filePath);

        commandFile.onCommand();
    }
}

// Decide which variables should be exported.
module.exports = {
    commandSetup
};