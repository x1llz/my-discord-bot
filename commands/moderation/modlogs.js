const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const modLogsPath = path.join(__dirname, "../../data/modlogs.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modlogs")
    .setDescription("View moderation logs of a specific user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to view logs").setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    if (!fs.existsSync(modLogsPath))
      return interaction.reply({
        content: "⚠️ No moderation logs found yet.",
        ephemeral: true,
      });

    const data = JSON.parse(fs.readFileSync(modLogsPath, "utf8"));
    const logs = data[interaction.guild.id]?.[user.id];

    if (!logs || logs.length === 0)
      return interaction.reply({
        content: `${user.tag} has no moderation logs.`,
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`🧾 Moderation Logs for ${user.tag}`)
      .setDescription(
        logs
          .map(
            (log, i) =>
              `**#${i + 1}** — ${log.action}\n> Moderator: ${log.moderator}\n> Reason: ${log.reason}\n> Date: <t:${Math.floor(
                new Date(log.date).getTime() / 1000
              )}:R>`
          )
          .join("\n\n")
      )
      .setFooter({ text: "Hellz V3 Moderation System" });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};