import { PermissionFlagsBits, EmbedBuilder } from "discord.js";

export default {
  name: "unlock",
  description: "Unlock the current channel 🔓",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission to unlock channels.");

    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: true,
      });

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("🔓 Channel Unlocked")
        .setDescription(`Channel unlocked by ${message.author.tag}.`);

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      return message.reply("❌ Failed to unlock the channel.");
    }
  },
};