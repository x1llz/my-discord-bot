const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Show all available commands (visible only to you).")
    .setDMPermission(true),

  async execute(interaction) {
    const basePath = path.join(__dirname, "..");
    const categories = fs.readdirSync(basePath);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("📜 Hellz Commands List");

    for (const category of categories) {
      const folder = path.join(basePath, category);
      if (!fs.statSync(folder).isDirectory()) continue;

      const files = fs.readdirSync(folder).filter((f) => f.endsWith(".js"));
      const names = files.map((f) => `/${f.replace(".js", "")}`);
      embed.addFields({ name: category.toUpperCase(), value: names.join(", ") || "None" });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};