const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Show info about a user 🧾",
  async execute(message, args) {
    const member = message.mentions.members.first() || message.member;
    const user = member.user;
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`${user.tag}`)
      .addFields(
        { name: "ID", value: `${user.id}`, inline: true },
        { name: "Bot?", value: `${user.bot}`, inline: true },
        { name: "Joined server", value: `<t:${Math.floor(member.joinedTimestamp/1000)}:R>`, inline: true },
        { name: "Account created", value: `<t:${Math.floor(user.createdTimestamp/1000)}:R>`, inline: true }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};