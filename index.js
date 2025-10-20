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
client.snipes = new Map();
client.afk = new Map();
client._recentMessages = new Set();

const PREFIX = process.env.PREFIX || "+";

await loadCommands(client, "./commands");
registerEvents(client, PREFIX);

client.once("ready", () => {
  client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
  console.log(`🌸 Hellz Bot is online`);
});

const app = express();
app.get("/", (req, res) => res.send("Hellz Bot Alive"));
app.listen(process.env.PORT || 3000);

client.login(process.env.TOKEN);