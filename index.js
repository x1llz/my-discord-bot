import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Client, GatewayIntentBits, Partials, Collection, ActivityType } from "discord.js";
import { loadCommands } from "./handlers/commandHandler.js";
import { registerEvents } from "./handlers/eventHandler.js";

// Pour corriger le chemin sur Render / Node 22+
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ✅ Fix du chemin absolu pour Render
await loadCommands(client, path.join(__dirname, "commands"));
registerEvents(client, PREFIX);

client.once("ready", () => {
  client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
  console.log(`🌸 Logged in as ${client.user.tag}`);
});

// Express keep-alive (Render)
const app = express();
app.get("/", (req, res) => res.send("Hellz Bot alive"));
app.listen(process.env.PORT || 3000);

// Login
client.login(process.env.TOKEN);