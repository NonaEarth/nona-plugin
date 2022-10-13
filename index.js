/// <reference path="./HelperLib-master/src/index.d.ts" />

// Load package information.
let pjson = require('./package.json');

const commandIndex = require('./commandIndex.js');
const eventIndex = require('./eventIndex.js');

// An object that contains the plugin information,
let otherInformation = {
    author: (pjson.author),
    license: (pjson.license)
};

// Get the version of the plugin and convert it into an int type array,
let versionArr = (pjson.version).split('.');

// Register the plugin.
ll.registerPlugin((pjson.name), (pjson.description)
    , versionArr, otherInformation);

commandIndex.commandSetup();
eventIndex.eventSetup();