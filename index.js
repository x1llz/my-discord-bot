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
    GatewayIntentBits.GuildMembers,
  ],
});

const prefix = "+";
client.commands = new Collection();

// === CHARGEMENT DES COMMANDES ===
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name && command.execute) {
    client.commands.set(command.name, command);
    console.log(`✅ Commande chargée : ${command.name}`);
  } else {
    console.warn(`⚠️ Fichier ignoré (incomplet) : ${file}`);
  }
}

// === ÉVÉNEMENTS ===
client.once("ready", () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("❌ Une erreur est survenue lors de l’exécution de la commande.");
  }
});

// === EXPRESS KEEP ALIVE ===
const app = express();
app.get("/", (req, res) => res.send("Bot is alive!"));
app.listen(3000, () => console.log("🌐 Web server running"));

// === LOGIN ===
client.login(process.env.TOKEN);
