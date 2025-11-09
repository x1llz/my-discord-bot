require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
  AutoModerationRuleTriggerType,
  AutoModerationActionType,
} = require("discord.js");
const express = require("express");
const fs = require("fs");
const { loadCommands } = require("./handlers/commandHandler");
const { loadEvents } = require("./handlers/eventHandler");
const logger = require("./logger");

// ===== CLIENT CONFIG =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.commands = new Collection();
client.cooldowns = new Map();

// ===== LOAD HANDLERS =====
(async () => {
  try {
    await loadCommands(client);
    await loadEvents(client);
    logger.info("✅ All commands and events loaded.");
  } catch (err) {
    logger.error(`Handler error: ${err.stack}`);
  }
})();

// ===== READY EVENT (basic presence + AutoMod) =====
client.once("ready", async () => {
  logger.info(`🤖 Logged in as ${client.user.tag}`);
  client.user.setActivity("/help | .gg/hellz", { type: ActivityType.Playing });

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) return logger.warn("Guild ID not set or bot not in that guild.");

  try {
    const existingRules = await guild.autoModerationRules.fetch();
    if (!existingRules.some(r => r.name === "Hellz AutoMod")) {
      await guild.autoModerationRules.create({
        name: "Hellz AutoMod",
        eventType: 1,
        triggerType: AutoModerationRuleTriggerType.Keyword,
        triggerMetadata: { keywordFilter: ["badword", "nsfw", "interdit"] },
        actions: [{ type: AutoModerationActionType.BlockMessage }],
      });
      logger.info("✅ AutoMod initialized.");
    } else {
      logger.info("⚙️ AutoMod already active.");
    }
  } catch (err) {
    logger.error(`AutoMod setup failed: ${err.message}`);
  }
});

// ===== INTERACTION HANDLER =====
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
    logger.command(`${interaction.user.tag} used /${interaction.commandName}`);
  } catch (err) {
    logger.error(`Command error [/${interaction.commandName}]: ${err.stack}`);
    const reply = { content: "⚠️ Something went wrong.", ephemeral: true };
    if (interaction.replied || interaction.deferred) await interaction.followUp(reply);
    else await interaction.reply(reply);
  }
});

// ===== EXPRESS KEEP-ALIVE =====
const app = express();
app.get("/", (_, res) => res.send("✅ Hellz Bot is alive and running smoothly."));
app.listen(process.env.PORT || 3001, () => {
  logger.info(`🌐 Express server online — Port ${process.env.PORT || 3001}`);
});

// ===== LOGIN =====
client.login(process.env.TOKEN);
