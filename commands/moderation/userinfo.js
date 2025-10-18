import { EmbedBuilder } from "discord.js";

export default {
  name: "userinfo",
  description: "Display info about a user 👤",
  async execute(message) {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setColor("#9b59b6")
      .setTitle(`👤 User Info — ${user.tag}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "🪪 ID", value: user.id },
        { name: "📆 Joined Discord", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>` },
        { name: "📅 Joined Server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` }
      )
      .setFooter({ text: "Hellz Bot | Made by x1llz" });

    message.channel.send({ embeds: [embed] });
  },
};