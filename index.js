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
const { loadCommands } = require("./handlers/commandHandler");
const { loadEvents } = require("./handlers/eventHandler");
const logger = require("./logger");

// === CLIENT SETUP ===
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

// === LOADERS ===
(async () => {
  try {
    await loadCommands(client); // ← await obligatoire ici
    loadEvents(client);
  } catch (err) {
    logger.error(`Handler error: ${err.stack}`);
  }
})();

// === READY EVENT ===
client.once("ready", async () => {
  logger.info(`✅ Logged in as ${client.user.tag}`);
  client.user.setActivity("/help | .gg/hellz", { type: ActivityType.Playing });

  // === AUTOMOD SETUP ===
  const guildId = process.env.GUILD_ID || "1424695601727017141"; // default guild
  const guild = client.guilds.cache.get(guildId);

  try {
    if (!guild) return logger.warn("⚠️ Guild not found for AutoMod setup.");

    const existingRules = await guild.autoModerationRules.fetch();
    if (existingRules.some(r => r.name === "Hellz AutoMod")) {
      logger.info("💬 AutoMod already active.");
    } else {
      await guild.autoModerationRules.create({
        name: "Hellz AutoMod",
        eventType: 1,
        triggerType: AutoModerationRuleTriggerType.Keyword,
        triggerMetadata: { keywordFilter: ["nsfw", "badword", "interdit"] },
        actions: [{ type: AutoModerationActionType.BlockMessage }],
      });
      logger.info("✅ AutoMod successfully configured.");
    }
  } catch (err) {
    logger.error(`AutoMod setup failed: ${err.message}`);
  }
});

// === INTERACTION HANDLER ===
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client);
    logger.command(
      `${interaction.user.tag} used /${interaction.commandName} in ${
        interaction.guild ? interaction.guild.name : "DM"
      }`
    );
  } catch (err) {
    logger.error(`Command error (${interaction.commandName}): ${err.message}`);
    const reply = {
      content: "⚠️ Something went wrong executing this command.",
      ephemeral: true,
    };
    if (interaction.replied || interaction.deferred)
      await interaction.followUp(reply);
    else await interaction.reply(reply);
  }
});

// === EXPRESS KEEPALIVE ===
const app = express();
const PORT = process.env.PORT || 3001;
app.get("/", (_, res) => res.send("✅ Hellz Bot is running."));
app.listen(PORT, () => logger.info(`🌐 Express server online — Port ${PORT}`));

// === LOGIN ===
client.login(process.env.TOKEN);
