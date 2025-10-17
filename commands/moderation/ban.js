const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban a user ⛔ / Bannir un utilisateur ⛔",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const target = message.mentions.members.first();
    if (!target) return message.reply("⚠️ Mention someone to ban / Mentionne quelqu’un à bannir.");
    if (!target.bannable) return message.reply("🚫 I can’t ban this user / Je ne peux pas bannir cet utilisateur.");

    const reason = args.slice(1).join(" ") || "No reason provided / Aucune raison donnée.";
    await target.ban({ reason });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🚨 User Banned / Utilisateur banni")
      .setDescription(`**${target.user.tag}** has been banned.\n> Reason: ${reason}`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};