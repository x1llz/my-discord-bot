const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Timeout (mute) a user for a specific duration.")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user to mute").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("Mute duration (e.g. 10m, 1h, 1d)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for the mute")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const duration = interaction.options.getString("duration");
    const reason = interaction.options.getString("reason") || "No reason provided.";

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member)
      return interaction.reply({ content: "User not found.", ephemeral: true });

    const timeMap = { m: 60000, h: 3600000, d: 86400000 };
    const match = duration.match(/^(\d+)([mhd])$/);
    if (!match)
      return interaction.reply({
        content: "❌ Invalid duration format. Use m, h, or d (e.g. 10m, 1h, 1d).",
        ephemeral: true,
      });

    const time = parseInt(match[1]) * timeMap[match[2]];

    try {
      await member.timeout(time, reason);
      await interaction.reply({
        content: `🔇 **${user.tag}** has been muted for **${duration}**.\nReason: ${reason}`,
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Couldn't mute this user.", ephemeral: true });
    }
  },
};