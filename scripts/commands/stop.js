import { CommandPermissionLevel, CustomCommandRegistry, CustomCommandStatus, world } from "@minecraft/server";

/**
 * Represents a stop command
 * @param {CustomCommandRegistry} registry
 */
export function registerStopCommand(registry) {
  registry.registerCommand(
    {
      name: "bedrock:stop",
      description: "Stop the bedrock challenge.",
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: true,
    },
    () => {
      world.setDynamicProperty("bedrockChallenge", false);

      return {
        status: CustomCommandStatus.Success,
        message: "Bedrock challenge has stopped!",
      };
    }
  );
}
