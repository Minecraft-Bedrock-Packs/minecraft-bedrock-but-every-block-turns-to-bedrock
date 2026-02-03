# Minecraft Bedrock but every block turns to bedrock

## How to use

### Install

1. Go to the `Releases` tab.
2. Download the .mcaddon file.
3. Double click the download .mcaddon file and it will be imported into Minecraft.

### Run challenge

1. Add the addon to the world you wish to do this challenge on.
2. Load into the world.
3. Open chat and type `/start` to start the challenge. If you wish to stop open a chat and type `/stop`.

## Development

### Setup .env

```
PROJECT_NAME="bedrock"
MINECRAFT_PRODUCT="BedrockGDK"
CUSTOM_DEPLOYMENT_PATH=""
```

### To build

To build and deploy to Minecraft:

```
npm run local-deploy
```
