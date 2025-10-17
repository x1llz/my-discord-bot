const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "commands",
  description: "Show a categorized list of all commands 📜",

  async execute(message) {
    const baseDir = path.join(__dirname, ".."); // parent folder (commands root)
    const categories = fs.readdirSync(baseDir).filter(file =>
      fs.lstatSync(path.join(baseDir, file)).isDirectory()
    );

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("💫 Hellz V2 — Command List")
      .setDescription("Here's everything I can do, sorted by category:")
      .setFooter({
        text: "Made by X1LLZ 💻 | discord.gg/hellz",
        iconURL: message.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    for (const category of categories) {
      const commandFiles = fs
        .readdirSync(path.join(baseDir, category))
        .filter(f => f.endsWith(".js"));

      const commandNames = commandFiles
        .map(f => {
          const cmd = require(path.join(baseDir, category, f));
          return cmd.name ? `\`+${cmd.name}\`` : null;
        })
        .filter(Boolean)
        .join(", ");

      embed.addFields({
        name: `📂 ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        value: commandNames || "_No commands_",
      });
    }

    await message.channel.send({ embeds: [embed] });
  },
};