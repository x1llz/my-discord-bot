require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

const app = express();
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const prefix = process.env.PREFIX || "+"; // ton préfixe par défaut

// --- Petit serveur pour Render ---
app.get("/", (req, res) => res.send("Bot is alive!"));
app.listen(3000, () => console.log("✅ Web server running on port 3000"));

// --- Événement message ---
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const command = message.content.slice(prefix.length).trim().toLowerCase();

  if (command === "ping") {
    message.reply("🏓 Pong !");
  }

  if (command === "salut") {
    message.reply("👋 Salut à toi !");
  }
});

client.login(process.env.TOKEN);
