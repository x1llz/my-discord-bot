// commands/moderation/delwarn.js
const fs = require("fs");
const path = require("path");
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const file = path.join(__dirname, "../../data/warns.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delwarn")
    .setDescription("Delete one or all warns of a user.")
    .addUserOption(opt => opt.setName("user").setDescription("User to clear").setRequired(true))
    .addIntegerOption(opt => opt.setName("index").setDescription("Warn index (leave empty to clear all)"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const index = interaction.options.getInteger("index");
    const guildId = interaction.guild.id;

    const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {};
    if (!data[guildId]?.[user.id]?.length)
      return interaction.reply({ content: "No warns found for that user.", ephemeral: true });

    if (index) {
      if (index < 1 || index > data[guildId][user.id].length)
        return interaction.reply({ content: "Invalid warn index.", ephemeral: true });
      data[guildId][user.id].splice(index - 1, 1);
    } else {
      delete data[guildId][user.id];
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("✅ Warn(s) removed")
      .setDescription(index ? `Removed warn #${index} of ${user.tag}` : `Cleared all warns of ${user.tag}`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
