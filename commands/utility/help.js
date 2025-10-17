const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  description: "Displays all available commands 💫 / Affiche toutes les commandes disponibles 💫",

  async execute(message) {
    // Get all command folders
    const categories = fs.readdirSync("./commands");

    const embeds = [];

    for (const category of categories) {
      const commandFiles = fs
        .readdirSync(`./commands/${category}`)
        .filter(file => file.endsWith(".js"));

      const commandsList = commandFiles
        .map(file => {
          const cmd = require(`../../commands/${category}/${file}`);
          return `> **+${cmd.name}** — ${cmd.description || "No description / Aucune description"}`;
        })
        .join("\n");

      const embed = new EmbedBuilder()
        .setColor("#4db8ff")
        .setTitle(`🌐 Hellz Command Center — ${category.charAt(0).toUpperCase() + category.slice(1)}`)
        .setDescription(commandsList)
        .setImage("https://cdn.discordapp.com/attachments/1282973133931542551/1283924672933134458/Hellz_Banner.png") // ta bannière
        .setFooter({
          text: "Made by X1LLZ 💻 | discord.gg/hellz",
          iconURL: message.client.user.displayAvatarURL(),
        })
        .setTimestamp();

      embeds.push(embed);
    }

    // French + English main intro embed
    const mainEmbed = new EmbedBuilder()
      .setColor("#4db8ff")
      .setTitle("💫 Hellz Bot — Command Panel 💫")
      .setDescription(
        "🇫🇷 **Bienvenue sur le panneau d’aide Hellz !**\n" +
        "Voici toutes les commandes disponibles, classées par catégorie.\n\n" +
        "🇬🇧 **Welcome to Hellz Bot help panel!**\n" +
        "Here’s every available command, organized by category.\n\n" +
        "Use **`+command`** to execute any of them. 🔥"
      )
      .setImage("https://cdn.discordapp.com/attachments/1282973133931542551/1283924672933134458/Hell