const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "lock",
  description: "Lock a channel 🔒 / Verrouiller un salon 🔒",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const channel = message.mentions.channels.first() || message.channel;
    await channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔒 Channel Locked / Salon verrouillé")
      .setDescription(`Channel ${channel} has been locked!`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};