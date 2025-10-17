const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  description: "Mute a user (timeout) 🔇 / Rendre muet un utilisateur 🔇",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("⚠️ Mention someone to mute / Mentionne quelqu’un à rendre muet.");

    const time = args[1] || "10m";
    const duration = ms(time);
    if (!duration) return message.reply("⏰ Invalid time / Temps invalide (ex: 10m, 1h, 1d)");

    const reason = args.slice(2).join(" ") || "No reason / Aucune raison.";
    await member.timeout(duration, reason);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🔇 User Muted / Utilisateur rendu muet")
      .setDescription(`**${member.user.tag}** was muted for ${time}.\n> Reason: ${reason}`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};