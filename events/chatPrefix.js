let onEvent = function () {

    // When the player joins the server.
    mc.listen("onChat", (playerObject, textString) => {

        let prefix = '';

        // Load script files to make sure that there should be no error.
        let errorHandler = require('../errorHandler.js');

        // Load prefix information.
        errorHandler.jsonCheck();
        let prefixInfo = require('../data/prefix.json');

        if (prefixInfo[`${(playerObject.xuid)}`] != null) {
            prefix = (prefixInfo[`${(playerObject.xuid)}`]);
        }
        else {
            prefix = prefixInfo.default;
        }

        let displayedPrefix = `${prefix}`;
        const output = (`${displayedPrefix} §f${playerObject.name} : ${textString}`);
        
        mc.broadcast(output);
        return false;
    });
}

// Decide which variables should be exported.
module.exports = {
    onEvent
};