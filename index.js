require("dotenv").config();
const { 
  Client, 
  GatewayIntentBits, 
  Collection, 
  REST, 
  Routes, 
  ActivityType, 
  AutoModerationRuleTriggerType, 
  AutoModerationActionType 
} = require("discord.js");
const fs = require("fs");
const express = require("express");

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
const commands = [];

// ===== COMMAND LOADER =====
const loadCommands = (dir = "./commands") => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const path = `${dir}/${file}`;
    if (fs.statSync(path).isDirectory()) loadCommands(path);
    else if (file.endsWith(".js")) {
      const command = require(path);
      if (!command.data || !command.data.name) continue;
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    }
  }
};
loadCommands();
console.log(`✅ Loaded ${commands.length} commands.`);

// ===== GLOBAL COMMAND REGISTRATION =====
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log("🌍 Registering global slash commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log("✅ Global slash commands registered.");
  } catch (error) {
    console.error("❌ Error registering commands:");
    if (error.rawError?.errors) console.log(JSON.stringify(error.rawError.errors, null, 2));
    else console.error(error);
  }
})();

// ===== BOT READY =====
client.once("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  client.user.setActivity("/help  .gg/hellz", { type: ActivityType.Playing });

  // ===== AUTOMOD SETUP =====
  const guild = client.guilds.cache.get("1424695601727017141"); // ← remplace ici par ton ID de serveur
  try {
    if (!guild) return console.log("⚠️ Serveur introuvable pour AutoMod.");
    const existingRules = await guild.autoModerationRules.fetch();
    if (existingRules.some(r => r.name === "Hellz AutoMod Test")) {
      console.log("⚙️ AutoMod déjà configuré.");
    } else {
      await guild.autoModerationRules.create({
        name: "Hellz AutoMod Test",
        eventType: 1,
        triggerType: AutoModerationRuleTriggerType.Keyword,
        triggerMetadata: { keywordFilter: ["interdit", "badword", "nsfw"] },
        actions: [{ type: AutoModerationActionType.BlockMessage }],
      });
      console.log("✅ AutoMod actif sur le serveur.");
    }
  } catch (err) {
    console.error("❌ Erreur AutoMod :", err);
  }
});

// ===== INTERACTION HANDLER =====
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return;

  try {
    await cmd.execute(interaction);
  } catch (err) {
    console.error(err);
    const reply = { content: "⚠️ Something went wrong executing this command.", ephemeral: true };
    if (interaction.replied || interaction.deferred) await interaction.followUp(reply);
    else await interaction.reply(reply);
  }
});

// ===== KEEP ALIVE =====
const app = express();
app.get("/", (_, res) => res.send("Bot is running."));
app.listen(process.env.PORT || 3001, () =>
  console.log(`🌐 Express server running on port ${process.env.PORT || 3001}`)
);

// ===== LOGIN =====
client.login(process.env.TOKEN);
