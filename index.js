require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = process.env.PREFIX;

client.once("ready", () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const command = message.content.slice(prefix.length).trim().toLowerCase();

  if (command === "ping") {
    message.reply("🏓 Pong !");
  } else if (command === "salut") {
    message.reply("👋 Salut à toi !");
  }
});

const app = express();
app.get("/", (req, res) => res.send("Bot is alive!"));
app.listen(3000, () => console.log("Web server running"));

client.login(process.env.TOKEN);

