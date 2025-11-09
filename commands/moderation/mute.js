// commands/moderation/mute.js
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Timeout a user for a specific duration")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to mute").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("duration").setDescription("Duration (e.g. 10m, 1h, 1d)").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("reason").setDescription("Reason for mute").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const duration = interaction.options.getString("duration");
    const reason = interaction.options.getString("reason") || "No reason provided";

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: "❌ User not found.", ephemeral: true });

    const time = ms(duration);
    if (!time || time < 10000 || time > 2419200000)
      return interaction.reply({ content: "❌ Invalid duration.", ephemeral: true });

    await member.timeout(time, reason);
    await interaction.reply({
      content: `🔇 ${user.tag} muted for **${duration}**.\nReason: ${reason}`,
      ephemeral: false,
    });
  },
};
