import "dotenv/config";
import express from "express";
import { Client, GatewayIntentBits, Partials, Collection, ActivityType } from "discord.js";
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

// Load commands and events
await loadCommands(client, "./commands");
registerEvents(client, PREFIX);

// Bot ready
client.once("ready", () => {
  client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
  console.log(`✅ Hellz Bot is online as ${client.user.tag}`);
});

// Keep-alive express server
const app = express();
app.get("/", (req, res) => res.send("🌸 Hellz Bot is alive and running!"));
app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 Express server running on port 3000");
});

// Login
client.login(process.env.TOKEN);