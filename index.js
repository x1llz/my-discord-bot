// index.js — Version stable anti-duplication
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

// Empêche les doubles exécutions sur Render
if (global.botStarted) {
  console.log("Bot déjà démarré, arrêt de cette instance...");
  process.exit(0);
}
global.botStarted = true;

// Création du client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
const prefix = process.env.PREFIX || '+';

// === Chargement des commandes ===
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log(`✅ Commande chargée : ${command.name}`);
}

// === Événement "ready" ===
client.once('ready', () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
});

// === Événement "messageCreate" ===
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

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

// Gestion des erreurs pour éviter les crashs multiples
process.on('unhandledRejection', err => console.error('Unhandled Rejection:', err));
process.on('uncaughtException', err => console.error('Uncaught Exception:', err));

// === Connexion du bot ===
client.login(process.env.TOKEN).catch(err => {
  console.error("❌ Erreur de connexion au bot :", err.message);
});
