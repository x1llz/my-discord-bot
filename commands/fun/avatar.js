const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Show a user's avatar 🖼️ / Affiche l’avatar d’un utilisateur 🖼️",
  async execute(message) {
    const user = message.mentions.users.first() || message.author;

    const embed = new EmbedBuilder()
      .setColor("#4db8ff")
      .setTitle(`🖼️ Avatar of / de ${user.username}`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};