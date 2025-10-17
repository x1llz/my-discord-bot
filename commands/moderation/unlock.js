const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlock a channel 🔓 / Déverrouiller un salon 🔓",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const channel = message.mentions.channels.first() || message.channel;
    await channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔓 Channel Unlocked / Salon déverrouillé")
      .setDescription(`Channel ${channel} has been unlocked!`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};