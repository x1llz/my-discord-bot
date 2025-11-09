// commands/moderation/warnings.js
const fs = require("fs");
const path = require("path");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const file = path.join(__dirname, "../../data/warns.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("Check warns of a member.")
    .addUserOption(opt => opt.setName("user").setDescription("User to check").setRequired(true)),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const guildId = interaction.guild.id;
    const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
    const warns = data[guildId]?.[user.id] || [];

    if (!warns.length)
      return interaction.reply({ content: "This user has no warnings.", ephemeral: true });

    const desc = warns
      .map(
        (w, i) =>
          `**#${i + 1}**\nReason: ${w.reason}\nModerator: <@${w.moderator}>\nDate: <t:${Math.floor(
            new Date(w.date).getTime() / 1000
          )}:R>`
      )
      .join("\n\n");

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`⚠️ Warnings for ${user.tag}`)
      .setDescription(desc)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
