require("dotenv").config();
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
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
  ],
});

client.commands = new Collection();
const prefix = process.env.PREFIX || "+";

// === Data stores ===
client.snipes = new Map(); // { channelId -> { content, author, image, time } }
client.afk = new Map(); // { userId -> { reason, since } }
client._recentMessages = new Set(); // anti-duplication

// === Auto command loader ===
const loadCommands = (dir = "./commands") => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = `${dir}/${file}`;
    if (fs.lstatSync(fullPath).isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith(".js")) {
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
    }
  });
};
loadCommands();

// === Ready event ===
client.once("ready", () => {
  console.log(`🌸 Logged in as ${client.user.tag} 🌸`);

  // === Your original activity list (unchanged) ===
  const activities = [
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

// === Message handler (AFK + commands) ===
client.on("messageCreate", async (message) => {
  try {
    if (!message.guild || message.author.bot) return;

    // anti spam duplicate event
    if (client._recentMessages.has(message.id)) return;
    client._recentMessages.add(message.id);
    setTimeout(() => client._recentMessages.delete(message.id), 1500);

    // AFK remove
    if (client.afk.has(message.author.id)) {
      const old = client.afk.get(message.author.id);
      client.afk.delete(message.author.id);
      message.reply(`✅ Welcome back ${message.author.username}, AFK removed (was: ${old.reason}).`);
    }

    // mention AFK
    if (message.mentions.users.size > 0) {
      message.mentions.users.forEach((u) => {
        if (client.afk.has(u.id)) {
          const data = client.afk.get(u.id);
          const minutes = Math.floor((Date.now() - data.since) / 60000);
          message.reply(`💤 ${u.tag} is AFK: **${data.reason}** (${minutes} min ago)`);
        }
      });
    }

    // commands
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift()?.toLowerCase();
    if (!cmdName) return;

    const command = client.commands.get(cmdName);
    if (!command) return;

    await command.execute(message, args, client);
  } catch (err) {
    console.error("messageCreate handler error:", err);
    try {
      message.reply("⚠️ An error occurred while executing the command.");
    } catch {}
  }
});

// === Express keep-alive ===
const app = express();
app.get("/", (req, res) => res.send("🌸 Hellz Bot is online with 100+ activities 🌸"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`🌐 Web server active on port ${process.env.PORT || 3000}`);
});

// === Login ===
client.login(process.env.TOKEN);
