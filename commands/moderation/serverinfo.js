import { EmbedBuilder } from "discord.js";

export default {
  name: "serverinfo",
  description: "Show server information 🏰",
  async execute(message) {
    const { guild } = message;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`📊 Server Info — ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: "👑 Owner", value: `<@${guild.ownerId}>`, inline: true },
        { name: "👥 Members", value: `${guild.memberCount}`, inline: true },
        { name: "🗓 Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
      )
      .setFooter({ text: "Hellz Bot | Made by x1llz" });

    message.channel.send({ embeds: [embed] });
  },
};