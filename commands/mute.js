const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute (timeout) a member so they can't talk 🕐",
  async execute(message, args) {
    // Vérifie les permissions de la personne qui exécute
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return message.reply("❌ You don’t have permission to mute members.");
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply("⚠️ Please mention someone to mute.");

    if (target.id === message.author.id)
      return message.reply("😅 You can’t mute yourself.");
    if (target.permissions.has(PermissionsBitField.Flags.Administrator))
      return message.reply("🚫 You can’t mute an administrator.");

    const duration = args[1] ? parseInt(args[1]) : 10; // Durée par défaut : 10 minutes
    const reason = args.slice(2).join(" ") || "No reason provided.";

    // Convertir en millisecondes
    const timeMs = duration * 60 * 1000;
    if (isNaN(timeMs) || timeMs <= 0)
      return message.reply("⏱️ Invalid duration. Use minutes (e.g. `+mute @user 15 reason`).");

    try {
      await target.timeout(timeMs, reason);

      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("🔇 Member Muted")
        .setDescription(`**${target.user.tag}** has been muted for **${duration} minutes**.`)
        .addFields({ name: "Reason", value: reason })
        .setFooter({ text: `Muted by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("❌ I couldn’t mute this member. Check my permissions.");
    }
  },
};
