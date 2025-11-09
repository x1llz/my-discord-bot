const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Displays all bot commands grouped by category."),

  async execute(interaction) {
    const basePath = path.join(__dirname, "../");
    const categories = fs.readdirSync(basePath);

    const embed = new EmbedBuilder()
      .setColor("#00BFFF")
      .setTitle("📜 Hellz Commands List")
      .setDescription("All available commands grouped by category.")
      .setFooter({ text: "Hellz Bot V3 — Moderation • Fun • Utility" });

    for (const category of categories) {
      const catPath = path.join(basePath, category);
      if (!fs.statSync(catPath).isDirectory()) continue;

      const files = fs.readdirSync(catPath).filter(f => f.endsWith(".js"));
      const names = files
        .map(f => {
          try {
            const cmd = require(path.join(catPath, f));
            return cmd.data?.name ? `\`/${cmd.data.name}\`` : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (names.length > 0) embed.addFields({ name: `🗂️ ${category}`, value: names.join(", ") });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};