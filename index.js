import "dotenv/config";
import express from "express";
import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType
} from "discord.js";
import { loadCommands } from "./handlers/commandHandler.js";
import { registerEvents } from "./handlers/eventHandler.js";

// === Client Setup ===
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

// === Data Stores ===
client.commands = new Collection();
client.snipes = new Map();
client.afk = new Map();
client._recentMessages = new Set();

const PREFIX = process.env.PREFIX || "+";

// === Command & Event Loading ===
await loadCommands(client, "./commands");
registerEvents(client, PREFIX);

// === Ready Event ===
client.once("ready", () => {
  client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
  console.log(`🌸 Logged in as ${client.user.tag}`);
});

// === Keep Alive (Render) ===
const app = express();
app.get("/", (req, res) => res.send("🌸 Hellz Bot V2 is alive 🌸"));
app.listen(process.env.PORT || 3000, () =>
  console.log(`🌐 Web server active on port ${process.env.PORT || 3000}`)
);

// === Login ===
client.login(process.env.TOKEN);