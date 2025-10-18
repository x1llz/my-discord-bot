const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  description: "Show all available commands 💡",
  async execute(message) {
    const basePath = path.join(__dirname, "..");
    let commandsList = [];

    const categories = fs.readdirSync(basePath);
    for (const category of categories) {
      const commandFiles = fs
        .readdirSync(path.join(basePath, category))
        .filter((file) => file.endsWith(".js"));

      const cmds = commandFiles.map((file) => {
        const command = require(path.join(basePath, category, file));
        return `**+${command.name}** — ${command.description}`;
      });
      if (cmds.length) {
        commandsList.push(`📁 **${category.toUpperCase()}**\n${cmds.join("\n")}`);
      }
    }

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("💫 Hellz Bot Command Center 💫")
      .setDescription(commandsList.join("\n\n"))
      .setFooter({
        text: "Made by X1LLZ 💻 | discord.gg/hellz",
      })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};