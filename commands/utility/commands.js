const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Shows a list of all Hellz commands."),

  async execute(interaction, client) {
    const baseDir = path.join(__dirname, "../../commands");
    const categories = fs.readdirSync(baseDir);
    const embed = new EmbedBuilder()
      .setTitle("🌊 Hellz — Command List")
      .setColor("#00BFFF")
      .setDescription("All available slash commands categorized by module.")
      .setFooter({ text: "Use /help <command> for detailed info." })
      .setTimestamp();

    for (const category of categories) {
      const catPath = path.join(baseDir, category);
      if (!fs.statSync(catPath).isDirectory()) continue;

      const files = fs
        .readdirSync(catPath)
        .filter(f => f.endsWith(".js"));

      const commandsList = files
        .map(f => {
          try {
            const cmd = require(path.join(catPath, f));
            return `</${cmd.data.name}:${cmd.data.name}> — ${cmd.data.description || "No description."}`;
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (commandsList.length > 0)
        embed.addFields({
          name: `📂 ${category.charAt(0).toUpperCase() + category.slice(1)}`,
          value: commandsList.join("\n").slice(0, 1024),
        });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};