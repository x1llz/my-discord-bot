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
    GatewayIntentBits.GuildPresences, // nécessaire pour afficher les statuts
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
    console.log(`✅ Command loaded: ${command.name}`);
  } else {
    console.log(`⚠️ Ignored file: ${file}`);
  }
}

// === SÉCURITÉ ANTI-DOUBLE INSTANCE (Render bug) ===
if (client.readyTimestamp) {
  console.log("⚠️ Bot already initialized — exiting duplicate process.");
  process.exit(0);
}

// === ÉVÉNEMENT CLIENT READY ===
client.once("clientReady", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  console.log("🔥 Hellz Bot is now operational — made by X1LLZ");
  console.log("🌍 Connected successfully to Discord API");

  // === STATUT INITIAL ===
  client.user.setPresence({
    status: "online",
    activities: [{ name: "discord.gg/hellz 🌐", type: ActivityType.Watching }],
  });

  // === STATUTS ROTATIFS ===
  const activities = [
    // 💻 Tech / Fun
    { name: "discord.gg/hellz 🌐", type: ActivityType.Watching },
    { name: "coding kawaii scripts 💻", type: ActivityType.Playing },
    { name: "debugging bugs 🐛", type: ActivityType.Playing },
    { name: "fighting syntax errors 😤", type: ActivityType.Competing },
    { name: "writing spaghetti code 🍝", type: ActivityType.Competing },

    // 🎮 Games
    { name: "Minecraft", type: ActivityType.Playing },
    { name: "Valorant", type: ActivityType.Playing },
    { name: "Roblox 🕹️", type: ActivityType.Playing },
    { name: "League of Legends 😈", type: ActivityType.Playing },
    { name: "Genshin Impact ✨", type: ActivityType.Playing },
    { name: "Apex Legends 💥", type: ActivityType.Playing },

    // 🎧 Music / Chill
    { name: "lofi beats 🎶", type: ActivityType.Listening },
    { name: "anime openings 🎧", type: ActivityType.Listening },
    { name: "k-pop hits 💃", type: ActivityType.Listening },
    { name: "nightcore vibes 🌙", type: ActivityType.Listening },
    { name: "vaporwave dreams 🌀", type: ActivityType.Listening },

    // 📺 Watching
    { name: "Twitch streamers 🎥", type: ActivityType.Watching },
    { name: "YouTube tutorials 📺", type: ActivityType.Watching },
    { name: "One Piece 🏴‍☠️", type: ActivityType.Watching },
    { name: "Jujutsu Kaisen 🌀", type: ActivityType.Watching },
    { name: "Attack on Titan 💥", type: ActivityType.Watching },
    { name: "Spy x Family 💚", type: ActivityType.Watching },

    // 😴 Kawaii / Funny
    { name: "uwu noises 🌸", type: ActivityType.Playing },
    { name: "protecting senpai 💞", type: ActivityType.Playing },
    { name: "hugging everyone 🤗", type: ActivityType.Playing },
    { name: "eating ramen 🍜", type: ActivityType.Playing },
    { name: "spreading good vibes 🌈", type: ActivityType.Playing },
    { name: "dreaming of snacks 🍪", type: ActivityType.Playing },
  ];

  let i = 0;
  setInterval(() => {
    const activity = activities[i % activities.length];
    client.user.setActivity(activity.name, { type: activity.type });
    i++;
  }, 300000); // 5 minutes
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
    console.error(err);
    message.reply("⚠️ An error occurred while executing this command!");
  }
});

// === SERVEUR EXPRESS POUR RENDER ===
const app = express();
app.get("/", (req, res) => res.send("✅ Hellz Bot is alive and fully operational — Made by X1LLZ"));
app.listen(3000, () => console.log("🌐 Web server running for Render"));

// === CONNEXION DU BOT ===
client.login(process.env.TOKEN);
