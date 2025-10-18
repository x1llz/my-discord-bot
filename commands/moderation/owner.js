const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "owner",
  description: "Add an owner for the bot 👑",
  async execute(message, args, client) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("⚠️ Mention a user to make them owner.");

    client.owner = user.id;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("👑 Owner Added")
      .setDescription(`${user.tag} is now a bot owner.`);

    message.channel.send({ embeds: [embed] });
  },
};