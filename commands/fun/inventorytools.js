const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const toolsPath = path.join(__dirname, "../../data/tools.json");

const toolNames = {
  pickaxe: "⛏️ Pickaxe",
  rod: "🎣 Fishing Rod",
  shovel: "🪓 Shovel",
  rifle: "🏹 Hunting Rifle",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventorytools")
    .setDescription("Check your owned tools and durability 🔧"),

  async execute(interaction) {
    if (!fs.existsSync(toolsPath)) fs.writeFileSync(toolsPath, JSON.stringify({}));
    const userTools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
    const userId = interaction.user.id;
    const tools = userTools[userId] || {};

    const desc =
      Object.keys(tools).length > 0
        ? Object.entries(tools)
            .map(
              ([id, info]) =>
                `${toolNames[id] || id} — Durability: **${info.durability}**`
            )
            .join("\n")
        : "No tools owned ⚙️";

    const embed = new EmbedBuilder()
      .setColor("Grey")
      .setTitle(`🧰 ${interaction.user.username}'s Tools`)
      .setDescription(desc);

    await interaction.reply({ embeds: [embed] });
  },
};