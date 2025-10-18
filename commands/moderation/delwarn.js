const { EmbedBuilder } = require("discord.js");

const warns = new Map();

module.exports = {
  name: "delwarn",
  description: "Delete a specific warning from a user 🗑️",
  async execute(message, args) {
    const target = message.mentions.members.first();
    const index = parseInt(args[1]) - 1;

    if (!target) return message.reply("⚠️ Mention a user.");
    if (isNaN(index)) return message.reply("⚠️ Provide a warning number to delete.");

    const userWarns = warns.get(target.id);
    if (!userWarns || !userWarns[index])
      return message.reply("❌ Invalid warning number.");

    const removed = userWarns.splice(index, 1);
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🗑️ Warning Deleted")
      .setDescription(`Removed warning **${removed[0].reason}** from ${target.user.tag}`);

    message.channel.send({ embeds: [embed] });
  },
};