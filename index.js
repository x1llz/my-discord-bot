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
    GatewayIntentBits.GuildPresences
  ],
});

client.commands = new Collection();
client.prefix = "+";

// === SYSTEME OWNER & BLACKLIST ===
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const ownersPath = path.join(dataDir, "owners.json");
const blacklistPath = path.join(dataDir, "blacklist.json");

if (!fs.existsSync(ownersPath)) fs.writeFileSync(ownersPath, JSON.stringify(["1187100546683899995"], null, 2)); // 👑 Default owner
if (!fs.existsSync(blacklistPath)) fs.writeFileSync(blacklistPath, JSON.stringify([], null, 2));

const getOwners = () => JSON.parse(fs.readFileSync(ownersPath, "utf8"));
const getBlacklist = () => JSON.parse(fs.readFileSync(blacklistPath, "utf8"));

// === CHARGEMENT DES COMMANDES ===
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name && command.execute) {
    client.commands.set(command.name, command);
    console.log(`✅ Command loaded: ${command.name}`);
  } else {
    console.log(`⚠️ Command ignored: ${file}`);
  }
}

// === EVENT READY ===
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  console.log("🔥 Hellz Bot is operational — made by X1LLZ");

  // === STATUT INITIAL ===
  client.user.setPresence({
    status: "online",
    activities: [{ name: "discord.gg/hellz 🌐", type: ActivityType.Watching }],
  });

  // === ROTATION DE STATUS ===
  const activities = [
    { name: "discord.gg/hellz 🌐", type: ActivityType.Watching },
    { name: "moderating servers 🛡️", type: ActivityType.Playing },
    { name: "helping users 😎", type: ActivityType.Playing },
    { name: "coding kawaii scripts 💻", type: ActivityType.Playing },
    { name: "protecting senpai 💞", type: ActivityType.Playing },
  ];
  let i = 0;
  setInterval(() => {
    const act = activities[i++ % activities.length];
    client.user.setActivity(act.name, { type: act.type });
  }, 300000);
});

// === MESSAGE HANDLER ===
client.on("messageCreate", async message => {
  if (message.author.bot) return;

  // Répond quand on le ping
  if (message.mentions.has(client.user)) {
    return message.reply("👋 Hey! I’m **Hellz**, your all-in-one moderation and fun bot. Type `+help` to see what I can do!");
  }

  if (!message.content.startsWith(client.prefix)) return;
  const args = message.content.slice(client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  const blacklist = getBlacklist();
  const owners = getOwners();

  if (blacklist.includes(message.author.id))
    return message.reply("🚫 You are blacklisted from using this bot.");

  try {
    await command.execute(message, args, { client, owners, blacklist, getOwners, getBlacklist });
  } catch (err) {
    console.error(err);
    message.reply("⚠️ An error occurred while executing this command.");
  }
});

// === SERVEUR EXPRESS (Render) ===
const app = express();
app.get("/", (req, res) => res.send("✅ Hellz Bot is alive — made by X1LLZ"));
app.listen(3000, () => console.log("🌍 Web server active on Render"));

// === CONNEXION DU BOT ===
client.login(process.env.TOKEN);
