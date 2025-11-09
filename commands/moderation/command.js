const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("command")
    .setDescription("Displays all Hellz bot commands grouped by category."),

  async execute(interaction) {
    const basePath = path.join(__dirname, "../"); // go back to commands/
    const categories = fs.readdirSync(basePath).filter(dir =>
      fs.statSync(path.join(basePath, dir)).isDirectory()
    );

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("🌊 Hellz — Full Command List")
      .setDescription("All available commands categorized below.")
      .setFooter({ text: "Hellz Bot V3 • Moderation • Fun • Utility" })
      .setTimestamp();

    for (const category of categories) {
      const categoryPath = path.join(basePath, category);
      const files = fs.readdirSync(categoryPath).filter(f => f.endsWith(".js"));

      const commandNames = files
        .map(file => {
          try {
            const cmd = require(path.join(categoryPath, file));
            return cmd?.data?.name ? `\`/${cmd.data.name}\`` : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (commandNames.length > 0)
        embed.addFields({
          name: `📁 ${category.toUpperCase()}`,
          value: commandNames.join(", "),
        });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};