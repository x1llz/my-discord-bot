const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const adminsPath = path.join(__dirname, "../../data/admins.json");
const ownerId = "1187100546683899995";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mods")
    .setDescription("Show the bot owner and all bot admins.")
    .setDMPermission(true),

  async execute(interaction) {
    let admins = [];
    if (fs.existsSync(adminsPath))
      admins = JSON.parse(fs.readFileSync(adminsPath, "utf8"));

    const embed = new EmbedBuilder()
      .setTitle("👑 Hellz Bot Admins")
      .setColor("Blue")
      .addFields(
        { name: "Owner", value: `<@${ownerId}>`, inline: false },
        {
          name: "Admins",
          value: admins.length ? admins.map((id) => `<@${id}>`).join("\n") : "None",
          inline: false,
        }
      )
      .setFooter({ text: "Hellz V3 Moderation System" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};