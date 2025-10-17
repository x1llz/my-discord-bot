const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kick a user 👢 / Expulser un utilisateur 👢",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const target = message.mentions.members.first();
    if (!target) return message.reply("⚠️ Mention someone to kick / Mentionne quelqu’un à expulser.");
    if (!target.kickable) return message.reply("🚫 I can’t kick this user / Je ne peux pas expulser cet utilisateur.");

    const reason = args.slice(1).join(" ") || "No reason / Aucune raison.";
    await target.kick(reason);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("👢 User Kicked / Utilisateur expulsé")
      .setDescription(`**${target.user.tag}** was kicked.\n> Reason: ${reason}`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};