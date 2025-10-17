const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const warns = new Map();

module.exports = {
  name: "delwarn",
  description: "Delete a user warning 🚫 / Supprimer un avertissement 🚫",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don’t have permission / Tu n’as pas la permission.");

    const member = message.mentions.members.first();
    const index = parseInt(args[1]) - 1;
    if (!member || isNaN(index))
      return message.reply("⚠️ Usage: `+delwarn @user <number>`");

    const userWarns = warns.get(member.id);
    if (!userWarns || !userWarns[index])
      return message.reply("⚠️ Invalid warning number / Numéro invalide.");

    const removed = userWarns.splice(index, 1);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🚫 Warning Removed / Avertissement supprimé")
      .setDescription(`Removed warning **"${removed[0].reason}"** from **${member.user.tag}**.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};