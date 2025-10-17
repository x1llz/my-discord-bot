const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const warns = new Map();

module.exports = {
  name: "warn",
  description: "Warn a user ⚠️ / Avertir un utilisateur ⚠️",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention someone to warn / Mentionne quelqu’un à avertir.");

    const reason = args.slice(1).join(" ") || "No reason / Aucune raison.";
    if (!warns.has(member.id)) warns.set(member.id, []);
    warns.get(member.id).push({ reason, by: message.author.tag, date: new Date() });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("⚠️ User Warned / Utilisateur averti")
      .setDescription(`**${member.user.tag}** was warned.\n> Reason: ${reason}`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};