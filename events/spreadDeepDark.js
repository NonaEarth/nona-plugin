let onEvent = function () {

    let isLoop = {};

    function delay(ms) {
        //[] 정해진 ms가 지나야 resolve를 호출하는 프로미스를 리턴한다.
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Spread the deep dark block.
    let spread = function (playerObject) {

        isLoop[playerObject.xuid] = true;

        let loop = async function () {
            while (isLoop[playerObject.xuid]) {

                if (mc.getPlayer(playerObject.xuid).isOnGround) {

                    // Get the block information.
                    let playerBlockPos = (playerObject.blockPos);
                    playerBlockPos.y -= 1;

                    if ((mc.getBlock(playerBlockPos)).id != 0) {
                        // Replace the block.
                        mc.setBlock(playerBlockPos, 'minecraft:sculk');
                    }
                }

                await delay(50);
            }
        };

        loop();
    }

    // When the player joins the server.
    mc.listen("onJoin", (playerObject) => {

        // Lend the player information to the function.
        spread(playerObject);
    });

    // When the player leaves the server.
    mc.listen("onLeft", (playerObject) => {
        isLoop[playerObject.xuid] = false;
    });
}

// Decide which variables should be exported.
module.exports = {
    onEvent
};