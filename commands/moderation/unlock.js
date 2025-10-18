const { PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlock a channel 🔓",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission to unlock channels.");

    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SendMessages: true,
    });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔓 Channel Unlocked")
      .setDescription(`This channel has been unlocked by ${message.author.tag}.`);

    message.channel.send({ embeds: [embed] });
  },
};