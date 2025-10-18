import "dotenv/config";
import express from "express";
import { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  Collection, 
  ActivityType 
} from "discord.js";
import fs from "fs";
import path from "path";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User
  ],
});

client.commands = new Collection();
client.snipes = new Map();
client.afk = new Map();
client._recentMessages = new Set();

const PREFIX = process.env.PREFIX || "+";

// === Load Commands ===
const loadCommands = (dir = "./commands") => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith(".js")) {
      import(`./${fullPath.replace(/\\/g, "/")}`)
        .then(command => {
          const cmd = command.default || command;
          if (cmd.name && typeof cmd.execute === "function") {
            client.commands.set(cmd.name.toLowerCase(), cmd);
            console.log(`✅ Loaded command: ${cmd.name}`);
          }
        })
        .catch(err => console.error(`❌ Error loading ${file}:`, err));
    }
  });
};
loadCommands();

// === Events ===
import { registerEvents } from "./handlers/eventHandler.js";
registerEvents(client, PREFIX);

// === Ready ===
client.once("ready", () => {
  client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
  console.log(`🌸 Logged in as ${client.user.tag}`);
});

// === Express Keep-Alive ===
const app = express();
app.get("/", (req, res) => res.send("Hellz Bot is alive and running ⚡"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`🌐 Express running on port ${process.env.PORT || 3000}`);
});

// === Login ===
client.login(process.env.TOKEN);