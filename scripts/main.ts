import { world, system, Vector3 } from "@minecraft/server";
import { registerStartCommand } from "./commands/start";
import { registerStopCommand } from "./commands/stop";

import { MinecraftBlockTypes } from "@minecraft/vanilla-data";

const trackedGaze = new Map();

const protectedBlockTypes: string[] = [
  MinecraftBlockTypes.Bedrock,
  MinecraftBlockTypes.Obsidian,
  MinecraftBlockTypes.EndPortalFrame,
  MinecraftBlockTypes.EndPortal,
  MinecraftBlockTypes.Portal,
];

const rayOptions = {
  maxDistance: 250,
  includeLiquidBlocks: true,
  includePassableBlocks: true,
};

system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
  registerStartCommand(customCommandRegistry);
  registerStopCommand(customCommandRegistry);
});

function locationsEqual(loc1: Vector3, loc2: Vector3) {
  return loc1.x === loc2.x && loc1.y === loc2.y && loc1.z === loc2.z;
}

system.runInterval(() => {
  let challengeActive = world.getDynamicProperty("bedrockChallenge");

  if (challengeActive === undefined || challengeActive === false) {
    return;
  }

  for (const player of world.getAllPlayers()) {
    const hit = player.getBlockFromViewDirection(rayOptions);

    if (hit?.block) {
      const currentLocation = hit.block.location;

      const playerGaze = trackedGaze.get(player.id);

      if (
        playerGaze &&
        playerGaze.dimensionId === player.dimension.id &&
        !locationsEqual(playerGaze.location, currentLocation)
      ) {
        const previousBlock = player.dimension.getBlock(playerGaze.location);
        if (previousBlock && !protectedBlockTypes.includes(previousBlock.typeId)) {
          previousBlock.setType(MinecraftBlockTypes.Bedrock);
        }
      }

      trackedGaze.set(player.id, {
        dimensionId: player.dimension.id,
        location: currentLocation,
      });
    } else {
      const playerGaze = trackedGaze.get(player.id);

      if (playerGaze && playerGaze.dimensionId === player.dimension.id) {
        const previousBlock = player.dimension.getBlock(playerGaze.location);

        if (
          previousBlock &&
          !protectedBlockTypes.includes(previousBlock.typeId) &&
          previousBlock.typeId !== MinecraftBlockTypes.Bedrock
        ) {
          previousBlock.setType(MinecraftBlockTypes.Bedrock);
        }
      }

      trackedGaze.delete(player.id);
    }
  }
}, 1);
