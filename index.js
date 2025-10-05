// index.js
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const express = require("express");
require("dotenv").config();

// === Express server pour Render === //
const app = express();
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Bot is alive ✅"));
app.listen(PORT, () => console.log(`🌐 Web server actif sur le port ${PORT}`));

// === Initialisation du bot === //
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

// === Chargement automatique des commandes === //
const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandPath = `./commands/${folder}`;
  const stat = fs.statSync(commandPath);

  if (stat.isDirectory()) {
    // Sous-dossier de commandes
    const commandFiles = fs
      .readdirSync(commandPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`${commandPath}/${file}`);
      if (command.name) {
        client.commands.set(command.name, command);
        console.log(`✅ Commande chargée : ${command.name}`);
      }
    }
  } else if (folder.endsWith(".js")) {
    // Commande directement dans /commands
    const command = require(`./commands/${folder}`);
    if (command.name) {
      client.commands.set(command.name, command);
      console.log(`✅ Commande chargée : ${command.name}`);
    }
  }
}

// === Événement : quand le bot est prêt === //
client.once("ready", () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
});

// === Événement : quand un message est envoyé === //
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith("+")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("❌ Erreur lors de l'exécution de la commande !");
  }
});

// === Connexion du bot === //
client.login(process.env.TOKEN);
