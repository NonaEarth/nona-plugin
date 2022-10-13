let commandInfo = {
    cmd: 'nonaprefix',
    description: 'nonaprefix.',
    permission : PermType.GameMasters
    // flag: 0x80,
    // alias: ''
};

// Load node.js components.
const fs = require('node:fs');
const path = require('node:path');

// Load script files to make sure that there should be no error.
let errorHandler = require('../errorHandler.js');

// Load prefix information.
errorHandler.jsonCheck();
let prefixInfo = require('../data/prefix.json');

let onCommand = function() {

    mc.listen("onServerStarted", () => {
        let cmd = mc.newCommand((commandInfo.cmd),
            (commandInfo.description), (commandInfo.permission));

        cmd.setAlias('nonaprefix');

        //[] Read the parameters to make them into an array
        //[] that has each parameter splitted by spacings.
        cmd.optional('parameter', (ParamType.RawText));
        cmd.overload(['parameter'])

        // Set the command Enums.
        cmd.setEnum('setEnum', ['set']);
        cmd.setEnum('resetEnum', ['reset']);

        // Register the actual commands.
        cmd.mandatory('baseCMD', (ParamType.Enum), 'setEnum', 1);
        cmd.optional("context", ParamType.Message);
        cmd.overload(['setEnum', 'context']);

        cmd.mandatory('baseCMD', (ParamType.Enum), 'resetEnum', 1);
        cmd.overload(['resetEnum']);

        // It runs when when getting the command input.
        cmd.setCallback((_cmd, _ori, out, res) => {

            // Get the string value containing all the arguments
            // and split them into an array.
            let fullParameter = `${res.parameter}`;
            let parametersArr = (fullParameter).split(' ');

            //[] Check which command was used.
            switch (parametersArr[0]) {

                // Base Commands
                case 'reset':
                    delete prefixInfo[`${_ori.player.xuid}`];
                    fs.writeFileSync(path.resolve(__dirname, '../data/prefix.json'), JSON.stringify(prefixInfo, null, 2));

                    return out.success(`[Nona Prefix] Successfully reset the prefix!`);
                    break;

                // Commands with additional parameters.
                case 'set':

                    //! When there is no argument.
                    if (parametersArr[1] == null) {
                        return out.success(`[Nona Prefix] There is nothing to set.`);
                    }

                    // Making all the arguments into one string value,
                    // excluding the first one.
                    let desiredPrefix = '';
                    for (let index = 1; index < parametersArr.length; index++) {
                        desiredPrefix += `${parametersArr[index]}`;

                        if (index != parametersArr.length - 1) {
                            desiredPrefix += ' ';
                        }
                    }

                    let index = 0;
                    let maximum = 100;
                    while (desiredPrefix.includes('&') && index < maximum) {
                        desiredPrefix = desiredPrefix.replace('&', '§');
                        index++;
                    }

                    prefixInfo[`${_ori.player.xuid}`] = desiredPrefix;
                    fs.writeFileSync(path.resolve(__dirname, '../data/prefix.json'), JSON.stringify(prefixInfo, null, 2));

                    // Output the message.
                    return out.success(`[Nona Prefix] All done!`);
                    break;

                default:
                    return out.success(`Error!`);
                    break;
            }
        });
        
        // cmd.setup();
        cmd.setup();
    });
}

// Decide which variables should be exported.
module.exports = {
    onCommand
};