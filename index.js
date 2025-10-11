require("dotenv").config();
<<<<<<< HEAD
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType,
} = require("discord.js");
const fs = require("fs");
const express = require("express");

// === Client configuration ===
=======
const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
const fs = require("fs");
const express = require("express");

>>>>>>> bc39ee4acadc7aea05e1de60c118c05a19a7c06d
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
<<<<<<< HEAD
    GatewayIntentBits.GuildVoiceStates, // pour la musique
    GatewayIntentBits.GuildMessageReactions, // pour les giveaways / réactions
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
=======
>>>>>>> bc39ee4acadc7aea05e1de60c118c05a19a7c06d
  ],
});

client.commands = new Collection();
const prefix = process.env.PREFIX || "+";

<<<<<<< HEAD
// --- Data stores centralisés (no more listeners in commands)
client.snipes = new Map(); // key = channelId -> { content, author, image, time }
client.afk = new Map(); // key = userId -> { reason, since }
client._recentMessages = new Set(); // small de-dup set for messageCreate duplicates

// === Auto command loader ===
const loadCommands = (dir = "./commands") => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((file) => {
=======
// === Chargement automatique des commandes ===
const loadCommands = (dir = "./commands") => {
  fs.readdirSync(dir).forEach(file => {
>>>>>>> bc39ee4acadc7aea05e1de60c118c05a19a7c06d
    const fullPath = `${dir}/${file}`;
    if (fs.lstatSync(fullPath).isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith(".js")) {
<<<<<<< HEAD
      try {
        const command = require(fullPath);
        if (command.name && typeof command.execute === "function") {
          client.commands.set(command.name.toLowerCase(), command);
          console.log(`✅ Command loaded: ${command.name}`);
        } else {
          console.warn(`⚠️ Invalid command structure in: ${file}`);
        }
      } catch (err) {
        console.error(`❌ Error loading command ${file}:`, err);
      }
=======
      const command = require(fullPath);
      client.commands.set(command.name, command);
      console.log(`✅ Commande chargée : ${command.name}`);
>>>>>>> bc39ee4acadc7aea05e1de60c118c05a19a7c06d
    }
  });
};
loadCommands();

<<<<<<< HEAD
// === Ready ===
client.once("ready", () => {
  console.log(`🌸 Logged in as ${client.user.tag} 🌸`);

  // === Your activity list remains 100% unchanged ===
  const activities = [
    // (PUT EXACTLY the full activities list you had — I keep it identical)
=======
// === Quand le bot est prêt ===
client.once("ready", () => {
  console.log(`🌸 Connecté en tant que ${client.user.tag} 🌸`);

  // === Liste MASSIVE d’activités ===
  const activities = [
>>>>>>> bc39ee4acadc7aea05e1de60c118c05a19a7c06d
    // 🎮 Gaming
    { name: "Valorant", type: ActivityType.Playing },
    { name: "Roblox", type: ActivityType.Playing },
    { name: "Minecraft", type: ActivityType.Playing },
    { name: "League of Legends", type: ActivityType.Playing },
    { name: "Genshin Impact", type: ActivityType.Playing },
    { name: "Apex Legends", type: ActivityType.Playing },
    { name: "Fortnite", type: ActivityType.Playing },
    { name: "osu!", type: ActivityType.Playing },
    { name: "Overwatch 2", type: ActivityType.Playing },
    { name: "Rocket League", type: ActivityType.Playing },
    { name: "Call of Duty", type: ActivityType.Playing },
    { name: "Among Us", type: ActivityType.Playing },
    { name: "Terraria", type: ActivityType.Playing },
    { name: "Rust", type: ActivityType.Playing },
    { name: "The Sims 4", type: ActivityType.Playing },
    { name: "Cyberpunk 2077", type: ActivityType.Playing },
    { name: "Palworld", type: ActivityType.Playing },
    { name: "Phasmophobia", type: ActivityType.Playing },
    { name: "Elden Ring", type: ActivityType.Playing },
    { name: "Pokemon Unite", type: ActivityType.Playing },

    // 🎧 K-Pop / Music
    { name: "BLACKPINK 💕", type: ActivityType.Listening },
    { name: "BTS 🔥", type: ActivityType.Listening },
    { name: "Stray Kids", type: ActivityType.Listening },
    { name: "TWICE 💞", type: ActivityType.Listening },
    { name: "NewJeans 🎀", type: ActivityType.Listening },
    { name: "LE SSERAFIM", type: ActivityType.Listening },
    { name: "IVE ✨", type: ActivityType.Listening },
    { name: "TXT 🌈", type: ActivityType.Listening },
    { name: "ITZY 💋", type: ActivityType.Listening },
    { name: "ENHYPEN 💫", type: ActivityType.Listening },
    { name: "aespa 🔮", type: ActivityType.Listening },
    { name: "EXO ⚡", type: ActivityType.Listening },

    // 🎥 Anime & Manga
    { name: "One Piece", type: ActivityType.Watching },
    { name: "Naruto", type: ActivityType.Watching },
    { name: "Jujutsu Kaisen", type: ActivityType.Watching },
    { name: "Attack on Titan", type: ActivityType.Watching },
    { name: "Tokyo Ghoul", type: ActivityType.Watching },
    { name: "Demon Slayer", type: ActivityType.Watching },
    { name: "My Hero Academia", type: ActivityType.Watching },
    { name: "Chainsaw Man", type: ActivityType.Watching },
    { name: "Spy x Family", type: ActivityType.Watching },
    { name: "Solo Leveling", type: ActivityType.Watching },
    { name: "Blue Lock", type: ActivityType.Watching },
    { name: "Your Name 💖", type: ActivityType.Watching },
    { name: "Weathering With You 🌧️", type: ActivityType.Watching },
    { name: "Kimi ni Todoke 🌸", type: ActivityType.Watching },
    { name: "Dragon Ball Z", type: ActivityType.Watching },
    { name: "Haikyuu!! 🏐", type: ActivityType.Watching },
    { name: "Re:Zero", type: ActivityType.Watching },
    { name: "Erased 🕒", type: ActivityType.Watching },

    // 💻 Dev / Internet
    { name: "du code JS 💻", type: ActivityType.Playing },
    { name: "avec des API Discord 😎", type: ActivityType.Playing },
    { name: "Render Dashboard", type: ActivityType.Watching },
    { name: "YouTube Tutorials", type: ActivityType.Watching },
    { name: "GitHub Repos", type: ActivityType.Watching },
    { name: "VS Code", type: ActivityType.Playing },
    { name: "Node.js Terminal", type: ActivityType.Playing },
    { name: "npm install kawaii", type: ActivityType.Playing },
    { name: "des bots Discord", type: ActivityType.Playing },

    // 🌸 Chill / Fun / Random
    { name: "Spotify 🎧", type: ActivityType.Listening },
    { name: "Netflix 🍿", type: ActivityType.Watching },
    { name: "TikTok 🕺", type: ActivityType.Watching },
    { name: "YouTube Shorts 📱", type: ActivityType.Watching },
    { name: "du café ☕", type: ActivityType.Playing },
    { name: "avec des chats 🐱", type: ActivityType.Playing },
    { name: "à faire des memes 😂", type: ActivityType.Playing },
    { name: "à dormir 😴", type: ActivityType.Playing },
    { name: "à rêver 💭", type: ActivityType.Playing },
    { name: "des serveurs chill", type: ActivityType.Watching },
    { name: "vos dramas Discord 😅", type: ActivityType.Watching },
    { name: "à envoyer des gifs random 🖼️", type: ActivityType.Playing },
    { name: "un épisode de Love Live!", type: ActivityType.Watching },
    { name: "une vibe lo-fi 🌙", type: ActivityType.Listening },
    { name: "la pluie ☔", type: ActivityType.Listening },
    { name: "le silence... 🤫", type: ActivityType.Listening },
    { name: "son crush 🩷", type: ActivityType.Watching },
    { name: "les étoiles 🌌", type: ActivityType.Watching },
    { name: "un feu de camp 🔥", type: ActivityType.Playing },
    { name: "des cookies 🍪", type: ActivityType.Playing },
    { name: "la lune 🌕", type: ActivityType.Watching },
    { name: "la vibe Kawaii 😻", type: ActivityType.Playing },
    { name: "avec des waifus 💞", type: ActivityType.Playing },
    { name: "Hellz Universe 🌐", type: ActivityType.Streaming, url: "https://twitch.tv/hellz" },
  ];

  let i = 0;
  setInterval(() => {
    client.user.setActivity(activities[i]);
    i = (i + 1) % activities.length;
<<<<<<< HEAD
  }, 180000);
});

// === Capture deleted messages (snipe) ===
client.on("messageDelete", (message) => {
  try {
    if (!message.guild || message.author?.bot) return;
    client.snipes.set(message.channel.id, {
      content: message.content || null,
      author: message.author,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null,
      time: Date.now(),
    });
  } catch (e) {
    console.error("snipe store error:", e);
  }
});

// === Central message handler (with de-dup and AFK handling) ===
client.on("messageCreate", async (message) => {
  try {
    // ignore bots & DMs
    if (!message.guild || message.author.bot) return;

    // --- De-dup: ignore duplicate message events with same ID (short window)
    if (client._recentMessages.has(message.id)) return;
    client._recentMessages.add(message.id);
    setTimeout(() => client._recentMessages.delete(message.id), 1500);

    // --- AFK: remove if the author was AFK
    if (client.afk.has(message.author.id)) {
      const old = client.afk.get(message.author.id);
      client.afk.delete(message.author.id);
      message.reply(`✅ Welcome back ${message.author.username}, I removed your AFK (was: ${old.reason}).`);
    }

    // --- AFK: notify if someone mentions AFK users
    if (message.mentions.users.size > 0) {
      message.mentions.users.forEach((u) => {
        if (client.afk.has(u.id)) {
          const data = client.afk.get(u.id);
          const minutes = Math.floor((Date.now() - data.since) / 60000);
          message.reply(`💤 ${u.tag} is AFK: **${data.reason}** (${minutes} min ago)`);
        }
      });
    }

    // --- Command parsing
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift()?.toLowerCase();
    if (!cmdName) return;

    const command = client.commands.get(cmdName);
    if (!command) return;

    await command.execute(message, args, client);
  } catch (err) {
    console.error("messageCreate handler error:", err);
    try { message.reply("⚠️ An error occurred while executing the command."); } catch {}
  }
});

// === Keep-alive Express server (Render) ===
const app = express();
app.get("/", (req, res) => res.send("🌸 Hellz Bot is online with 100+ activities 🌸"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`🌐 Web server active on port ${process.env.PORT || 3000}`);
});

// === Bot login ===
=======
  }, 180000); // change toutes les 3 minutes
});

// === Gestion des messages ===
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();

  const command = client.commands.get(cmdName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply("⚠️ Une erreur est survenue pendant l’exécution de la commande.");
  }
});

// === Express (keep-alive Render) ===
const app = express();
app.get("/", (req, res) => res.send("🌸 Hellz Bot tourne avec 100 activités stylées 🌸"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`🌐 Serveur web actif sur le port ${process.env.PORT || 3000}`);
});

// === Connexion ===
>>>>>>> bc39ee4acadc7aea05e1de60c118c05a19a7c06d
client.login(process.env.TOKEN);
