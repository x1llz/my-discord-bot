const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "lock",
  description: "Lock a channel 🔒",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission to lock channels.");

    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SendMessages: false,
    });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔒 Channel Locked")
      .setDescription(`This channel has been locked by ${message.author.tag}.`);

    message.channel.send({ embeds: [embed] });
  },
};