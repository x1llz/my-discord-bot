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

// === Client configuration ===
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

// === Charger les commandes ===
await loadCommands(client, "./commands");

// === Charger les événements ===
registerEvents(client, PREFIX);

// === Quand le bot est prêt ===
client.once("ready", () => {
  client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
  console.log(`🌸 Logged in as ${client.user.tag}`);
});

// === Express pour Render (ping serveur) ===
const app = express();
app.get("/", (req, res) => res.send("Hellz Bot is alive 🚀"));
app.listen(process.env.PORT || 3000, () =>
  console.log("🌐 Express server online")
);

// === Lancer le bot ===
client.login(process.env.TOKEN);