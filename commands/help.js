const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  description: "Show all available commands 💡",

  async execute(message) {
    // Lire tous les fichiers du dossier "commands"
    const commandFiles = fs
      .readdirSync(path.join(__dirname))
      .filter(file => file.endsWith(".js"));

    // Charger les commandes
    const commands = [];
    for (const file of commandFiles) {
      const command = require(`./${file}`);
      if (command.name && command.description) {
        commands.push({ name: command.name, description: command.description });
      }
    }

    // Tri alphabétique (optionnel)
    commands.sort((a, b) => a.name.localeCompare(b.name));

    // Construction de la liste
    const commandList = commands
      .map(cmd => `> **+${cmd.name}** — ${cmd.description}`)
      .join("\n");

    // Création de l'embed stylé 💅
    const embed = new EmbedBuilder()
      .setColor("#ff0066")
      .setTitle("💫 Hellz Command Center 💫")
      .setDescription(
        `Hey **${message.author.username}**, here’s everything I can do for you right now:\n\n${commandList}`
      )
      .addFields(
        { name: "✨ Prefix", value: "`+`", inline: true },
        { name: "🧠 Total Commands", value: `${commands.length}`, inline: true }
      )
      .setFooter({
        text: "Made by X1LLZ 💻 | Hellz Bot",
        iconURL: message.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};
