let commandInfo = {
    cmd: 'nona',
    description: 'nona.',
    permission : PermType.GameMasters
    // flag: 0x80,
    // alias: ''
};

let onCommand = function() {

    mc.listen("onServerStarted", () => {
        let cmd = mc.newCommand((commandInfo.cmd),
            (commandInfo.description), (commandInfo.permission));

        cmd.setAlias('nona');

        //[] Read the parameters to make them into an array
        //[] that has each parameter splitted by spacings.
        cmd.optional('parameter', (ParamType.RawText));
        cmd.overload(['parameter'])

        // Set the command Enums.
        cmd.setEnum('helpEnum', ['help']);
        cmd.setEnum('statusEnum', ['status']);
        cmd.setEnum('announceEnum', ['announce']);

        // Register the actual commands.
        cmd.mandatory('baseCMD', (ParamType.Enum), 'helpEnum', 1);
        cmd.overload(['helpEnum']);
        cmd.mandatory('baseCMD', (ParamType.Enum), 'statusEnum', 1);
        cmd.overload(['statusEnum']);
        
        cmd.mandatory('baseCMD', (ParamType.Enum), 'announceEnum', 1);
        cmd.optional("context", ParamType.Message);
        cmd.overload(['announceEnum', 'context']);

        // It runs when when getting the command input.
        cmd.setCallback((_cmd, _ori, out, res) => {

            // Get the string value containing all the arguments
            // and split them into an array.
            let fullParameter = `${res.parameter}`;
            let parametersArr = (fullParameter).split(' ');

            //[] Check which command was used.
            switch (parametersArr[0]) {

                // Base Commands
                case 'help':
                    return out.success(`[nonaPlugin] "/nona status" - Check the plugin status.`);
                    break;
                case 'status':
                    return out.success(`[nonaPlugin] Plugin is properly working.`);
                    break;
                case 'paratest':
                    return out.success(`[nonaPlugin] Plugin is properly working.`);
                    break;

                // Commands with additional parameters.
                case 'announce':

                    //! When there is no argument.
                    if (parametersArr[1] == null) {
                        return out.success(`[nonaPlugin] There is nothing to announce.`);
                    }

                    // Making all the arguments into one string value,
                    // excluding the first one.
                    let message = '';
                    for (let index = 1; index < parametersArr.length; index++) {
                        message += `${parametersArr[index]}`;

                        if (index != parametersArr.length - 1) {
                            message += ' ';
                        }
                    }

                    // Output the message.
                    return out.success(`[nonaPlugin] ${message}`);
                    break;

                default:
                    return out.success(`[nonaPlugin] "/nona help" for more information.`);
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