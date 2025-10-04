const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const express = require("express");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
// === IMPORTS ===
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// === DEBUG: afficher les erreurs ===
process.on("uncaughtException", err => console.error("❌ Uncaught Exception:", err));
process.on("unhandledRejection", err => console.error("❌ Unhandled Rejection:", err));

// === INITIALISATION DU BOT ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();
const prefix = "+";

// === CHARGEMENT DES COMMANDES ===
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name && command.execute) {
    client.commands.set(command.name, command);
    console.log(`✅ Commande chargée : ${command.name}`);
  } else {
    console.log(`⚠️ Commande ignorée (invalide) : ${file}`);
  }
}

// === ÉVÉNEMENTS DU BOT ===
client.once("ready", () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
});

// === GESTION DES COMMANDES ===
client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(`❌ Erreur dans la commande ${commandName}:`, err);
    message.reply("⚠️ Une erreur est survenue lors de l'exécution de cette commande !");
  }
});

// === SERVEUR EXPRESS (pour Render) ===
const app = express();
app.get("/", (req, res) => res.send("Bot is alive!"));
app.listen(3000, () => console.log("🌐 Web server running"));

// === CONNEXION ===
client.login(process.env.TOKEN);
