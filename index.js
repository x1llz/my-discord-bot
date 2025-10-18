import "dotenv/config";
import express from "express";
import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType,
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
const PREFIX = process.env.PREFIX || "+";

// === Command Loader ===
const loadCommands = (dir = "./commands") => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) return loadCommands(fullPath);
    if (file.endsWith(".js")) {
      import(fullPath).then((cmd) => {
        const command = cmd.default;
        if (command?.name && typeof command.execute === "function") {
          client.commands.set(command.name.toLowerCase(), command);
          console.log(`✅ Command loaded: ${command.name}`);
        }
      }).catch((err) => console.error(`❌ Error loading ${file}:`, err));
    }
  });
};
loadCommands();

// === Ready ===
client.once("ready", () => {
  client.user.setActivity("discord.gg/hellz", { type: ActivityType.Playing });
  console.log(`🌸 Logged in as ${client.user.tag}`);
});

// === Message Handler ===
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const cmdName = args.shift()?.toLowerCase();
  const command = client.commands.get(cmdName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error(err);
    message.reply("⚠️ An error occurred while executing this command.");
  }
});

// === Express Keep Alive ===
const app = express();
app.get("/", (req, res) => res.send("🌸 Hellz Bot is alive 🌸"));
app.listen(process.env.PORT || 3000);

// === Login ===
client.login(process.env.TOKEN);