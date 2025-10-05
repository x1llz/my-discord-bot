const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
});

client.commands = new Collection();
const prefix = process.env.PREFIX || '+';

// Charger les commandes une seule fois
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
    console.log(`✅ Commande chargée : ${command.name}`);
  }
}

// Éviter tout doublon d'écouteur
client.removeAllListeners("messageCreate");

client.once("ready", () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
});

// Gestion unique des commandes
client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("❌ Une erreur est survenue lors de l'exécution de la commande.");
  }
});

// Lancer le bot
client.login(process.env.TOKEN);
