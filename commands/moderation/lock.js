import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "lock",
  description: "Lock a channel 🔒",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission to lock channels.");

    await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: false });

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("🔒 Channel Locked")
      .setDescription(`Channel **${message.channel.name}** has been locked.`)
      .setFooter({ text: `Action by ${message.author.tag}` });

    message.channel.send({ embeds: [embed] });
  },
};