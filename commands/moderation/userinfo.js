const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Show user info 👤 / Afficher les infos d’un utilisateur 👤",
  async execute(message) {
    const member = message.mentions.members.first() || message.member;
    const user = member.user;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`👤 User Info — ${user.tag}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "🆔 ID", value: user.id, inline: true },
        { name: "📅 Account Created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: "💎 Joined Server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: "🎭 Roles", value: member.roles.cache.map(r => r).join(" ") || "None" }
      )
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};