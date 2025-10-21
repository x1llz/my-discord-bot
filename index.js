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

// 🔄 Charger les commandes et événements
(async () => {
  try {
    await loadCommands(client);
    registerEvents(client, PREFIX);

    client.once("ready", () => {
      client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
      console.log(`🌸 Logged in as ${client.user.tag}`);
    });

    const app = express();
    app.get("/", (req, res) => res.send("Hellz Bot alive"));
    app.listen(process.env.PORT || 3000, () => console.log("✅ Web server running"));

    await client.login(process.env.TOKEN);
  } catch (error) {
    console.error("❌ Startup error:", error);
  }
})();