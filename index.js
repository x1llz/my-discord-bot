require("dotenv").config();
const fs = require("fs");
const express = require("express");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  ActivityType,
} = require("discord.js");
const { loadCommands } = require("./handlers/commandHandler");
const { loadEvents } = require("./handlers/eventHandler");

// === Express Keep-Alive (for Render or local use) ===
const app = express();
const PORT = process.env.PORT || 3001; // Auto-detect port (Render sets its own)
app.get("/", (_, res) => res.send("🌊 Hellz Bot is running."));
app.listen(PORT, () =>
  console.log(`✅ Express server ready on port ${PORT}`)
);

// === Discord Client Setup ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
  ],
});

client.commands = new Collection();
client.cooldowns = new Collection();

// === Load handlers ===
loadCommands(client);
loadEvents(client);

// === Presence + Login ===
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: "/help .gg/hellz", type: ActivityType.Playing }],
    status: "online",
  });
});

client.login(process.env.TOKEN);