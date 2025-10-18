import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "owner",
  description: "Set a bot owner (administrator only)",
  async execute(message, args, client) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ Administrator permission required.");

    const user = message.mentions.users.first();
    if (!user) return message.reply("⚠️ Mention a user to set as owner.");

    client.owner = user.id;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("👑 Owner Set")
      .setDescription(`${user.tag} is now a bot owner.`)
      .setFooter({ text: `Set by ${message.author.tag}` });

    return message.channel.send({ embeds: [embed] });
  },
};