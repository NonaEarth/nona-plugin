// Load node.js components.
const fs = require('node:fs');
const path = require('node:path');

let jsonCheck = function () {

    const jsonPath = (path.resolve(__dirname, './data/prefix.json'));

    const jsonFrame = {
        "default": "§e[ User ]"
    };

    if (!(fs.existsSync(jsonPath))) {
        fs.writeFileSync(jsonPath, '{}');

        fs.writeFileSync(jsonPath, JSON.stringify(jsonFrame, null, 2));
    }
}

// Decide which variables should be exported.
module.exports = {
    jsonCheck
};