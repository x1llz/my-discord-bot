require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const prefix = process.env.PREFIX;

client.once("ready", () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const command = message.content.slice(prefix.length).trim().toLowerCase();

  if (command === "ping") {
    message.reply("🏓 Pong !");
  }

  if (command === "salut") {
    message.reply("👋 Salut à toi !");
  }
});

client.login(process.env.TOKEN);
