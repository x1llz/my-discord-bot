// === IMPORTS ===
const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// === INITIALISATION DU BOT ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences, // ✅ nécessaire pour afficher les statuts
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
    console.log(`⚠️ Commande ignorée : ${file}`);
  }
}

// === ÉVÉNEMENT READY ===
client.once("ready", () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
  console.log("🌐 Web server running");
  console.log("🔥 Hellz Bot is now operational — made by X1LLZ");

  // === STATUT INITIAL ===
  client.user.setPresence({
    status: "online",
    activities: [
      { name: "discord.gg/hellz 🌐", type: ActivityType.Watching }
    ],
  });

  // === STATUTS ROTATIFS ===
  const activities = [
    { name: "discord.gg/hellz 🌐", type: ActivityType.Watching },
    { name: "Roblox 🕹️", type: ActivityType.Playing },
    { name: "Minecraft", type: ActivityType.Playing },
    { name: "Valorant", type: ActivityType.Playing },
    { name: "anime openings 🎧", type: ActivityType.Listening },
    { name: "One Piece 🏴‍☠️", type: ActivityType.Watching },
    { name: "Spy x Family 💚", type: ActivityType.Watching },
    { name: "debugging bugs 🐛", type: ActivityType.Playing },
    { name: "coding kawaii scripts 💻", type: ActivityType.Playing },
    { name: "reading manga 📖", type: ActivityType.Watching },
    { name: "lofi beats 🎶", type: ActivityType.Listening },
    { name: "protecting senpai 💞", type: ActivityType.Playing },
    { name: "being adorable 💖", type: ActivityType.Playing },
    { name: "uwu noises 🌸", type: ActivityType.Playing },
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
    message.reply("⚠️ Une erreur est survenue lors de l'exécution de cette commande !");
  }
});

// === SERVEUR EXPRESS (pour le site du bot) ===
const app = express();

// Configuration EJS et fichiers statiques
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Page principale
app.get("/", (req, res) => {
  const commandsList = Array.from(client.commands.values());
  res.render("index", { commands: commandsList });
});

// Page de test (optionnelle)
app.get("/ping", (req, res) => res.send("🏓 Hellz Bot is alive!"));

// === LA
