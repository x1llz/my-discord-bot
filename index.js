// === IMPORTS ===
const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// === INITIALISATION DU CLIENT DISCORD ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.commands = new Collection();
const prefix = process.env.PREFIX || "+";

// === CHARGEMENT DES COMMANDES ===
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name && command.execute) {
    client.commands.set(command.name, command);
    console.log(`✅ Command loaded: ${command.name}`);
  } else {
    console.log(`⚠️ Command ignored: ${file}`);
  }
}

// === ÉVÉNEMENT READY ===
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  console.log("🌐 Web server running");
  console.log("🔥 Hellz Bot is now operational — made by X1LLZ");

  // === STATUT INITIAL ===
  client.user.setPresence({
    status: "online",
    activities: [{ name: "discord.gg/hellz 🌐", type: ActivityType.Watching }],
  });

  // === STATUTS ROTATIFS ===
  const activities = [
    { name: "discord.gg/hellz 🌐", type: ActivityType.Watching },
    { name: "Roblox 🕹️", type: ActivityType.Playing },
    { name: "Minecraft", type: ActivityType.Playing },
    { name: "Valorant", type: ActivityType.Playing },
    { name: "anime openings 🎧", type: ActivityType.Listening },
    { name: "k-pop hits 💃", type: ActivityType.Listening },
    { name: "One Piece 🏴‍☠️", type: ActivityType.Watching },
    { name: "Spy x Family 💚", type: ActivityType.Watching },
    { name: "debugging bugs 🐛", type: ActivityType.Playing },
    { name: "coding kawaii scripts 💻", type: ActivityType.Playing },
    { name: "reading manga 📖", type: ActivityType.Watching },
    { name: "lofi beats 🎶", type: ActivityType.Listening },
    { name: "Twitch streamers 🎥", type: ActivityType.Watching },
    { name: "protecting senpai 💞", type: ActivityType.Playing },
    { name: "being adorable 💖", type: ActivityType.Playing },
    { name: "uwu noises 🌸", type: ActivityType.Playing },
  ];

  let i = 0;
  setInterval(() => {
    const activity = activities[i % activities.length];
    client.user.setActivity(activity.name, { type: activity.type });
    i++;
  }, 300000); // 5 min
});

// === GESTION DES COMMANDES ===
client.on("messageCreate", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error(err);
    message.reply("⚠️ There was an error executing this command!");
  }
});

// === SERVEUR EXPRESS (pour Render) ===
const app = express();
app.get("/", (req, res) => res.send("✅ Hellz Bot is alive and operational — Made by X1LLZ"));
app.listen(process.env.PORT || 3000, () => console.log("🌍 Web server active on Render"));

// === CONNEXION DU BOT ===
client.login(process.env.TOKEN);
