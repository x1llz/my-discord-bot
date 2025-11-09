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

// === LOADERS (commands + events) ===
(async () => {
  try {
    await loadCommands(client);   // enregistre les slashs globalement
    loadEvents(client);           // connecte les events /events/**
  } catch (err) {
    logger.error(`Handler error: ${err.stack || err}`);
  }
})();

// === READY EVENT (presence + AutoMod) ===
client.once("ready", async () => {
  logger.info(`Logged in as ${client.user.tag}`);
  client.user.setActivity("/help | .gg/hellz", { type: ActivityType.Playing });

  const guildId = process.env.GUILD_ID || "1424695601727017141";
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    logger.warn("Guild not found for AutoMod setup.");
    return;
  }

  try {
    const rules = await guild.autoModerationRules.fetch();
    if (rules.some(r => r.name === "Hellz AutoMod")) {
      logger.info("AutoMod already active.");
    } else {
      await guild.autoModerationRules.create({
        name: "Hellz AutoMod",
        eventType: 1,
        triggerType: AutoModerationRuleTriggerType.Keyword,
        triggerMetadata: { keywordFilter: ["nsfw", "badword", "interdit"] },
        actions: [{ type: AutoModerationActionType.BlockMessage }],
      });
      logger.info("AutoMod successfully configured.");
    }
  } catch (err) {
    logger.error(`AutoMod setup failed: ${err.message || err}`);
  }
});

// === EXPRESS KEEPALIVE ===
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (_, res) => res.send("✅ Hellz Bot is running."));
app.listen(PORT, () => logger.info(`Express server online — Port ${PORT}`));

// === LOGIN ===
client.login(process.env.TOKEN);