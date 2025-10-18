import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "removeowner",
  description: "Remove the bot owner (administrator only)",
  async execute(message, args, client) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ Administrator permission required.");

    if (!client.owner) return message.reply("⚠️ No owner is currently set.");

    client.owner = null;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("❌ Owner Removed")
      .setDescription(`Bot owner has been removed by ${message.author.tag}.`);

    return message.channel.send({ embeds: [embed] });
  },
};