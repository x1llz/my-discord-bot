// commands/moderation/warn.js
const fs = require("fs");
const path = require("path");
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const file = path.join(__dirname, "../../data/warns.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a member for breaking the rules.")
    .addUserOption(opt => opt.setName("user").setDescription("User to warn").setRequired(true))
    .addStringOption(opt => opt.setName("reason").setDescription("Reason of the warn").setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason given.";
    const guildId = interaction.guild.id;
    const moderator = interaction.user.id;

    if (target.bot) return interaction.reply({ content: "You can't warn a bot.", ephemeral: true });

    const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
    data[guildId] ??= {};
    data[guildId][target.id] ??= [];

    data[guildId][target.id].push({ reason, moderator, date: new Date().toISOString() });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("⚠️ User Warned")
      .setDescription(`**User:** ${target.tag}\n**Moderator:** <@${moderator}>\n**Reason:** ${reason}`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
