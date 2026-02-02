import { CommandPermissionLevel, CustomCommandRegistry, CustomCommandStatus, world } from "@minecraft/server";

/**
 * Represents a start command
 * @param {CustomCommandRegistry} registry
 */
export function registerStartCommand(registry) {
  registry.registerCommand(
    {
      name: "bedrock:start",
      description: "Start the bedrock challenge.",
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: true,
    },
    () => {
      world.setDynamicProperty("bedrockChallenge", true);

      return {
        status: CustomCommandStatus.Success,
        message: "Bedrock challenge has started!",
      };
    }
  );
}
