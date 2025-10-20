import "dotenv/config";
import express from "express";
import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType,
} from "discord.js";
import { loadCommands } from "./handlers/commandHandler.js";
import { registerEvents } from "./handlers/eventHandler.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
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
client.snipes = new Map();
client.afk = new Map();
client._recentMessages = new Set();

const PREFIX = process.env.PREFIX || "+";

// === Load Commands & Events ===
await loadCommands(client, "./commands");
registerEvents(client, PREFIX);

// === Bot Ready ===
client.once("ready", () => {
  client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
  console.log(`🌸 Logged in as ${client.user.tag}`);
});

// === Keep Alive Express Server ===
const app = express();
app.get("/", (req, res) => res.send("🌸 Hellz Bot is running fine! 🌸"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Web server running on port ${process.env.PORT || 3000}`);
});

// === Login ===
client.login(process.env.TOKEN);