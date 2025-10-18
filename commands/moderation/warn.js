const { EmbedBuilder } = require("discord.js");

const warns = new Map();

module.exports = {
  name: "warn",
  description: "Warn a user ⚠️",
  async execute(message, args) {
    const target = message.mentions.members.first();
    if (!target) return message.reply("⚠️ Mention a user to warn.");
    const reason = args.slice(1).join(" ") || "No reason provided";

    if (!warns.has(target.id)) warns.set(target.id, []);
    warns.get(target.id).push({ reason, date: new Date() });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("⚠️ User Warned")
      .setDescription(`**${target.user.tag}** has been warned.\n📝 Reason: ${reason}`)
      .setFooter({ text: `Warned by ${message.author.tag}` });

    message.channel.send({ embeds: [embed] });
  },
};