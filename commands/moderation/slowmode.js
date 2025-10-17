const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "slowmode",
  description: "Set channel slowmode 🕒 / Activer le slowmode 🕒",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const duration = parseInt(args[0]);
    if (isNaN(duration) || duration < 0 || duration > 21600)
      return message.reply("⚠️ Enter a valid number (0-21600 sec) / Entre un nombre valide (0-21600 sec).");

    await message.channel.setRateLimitPerUser(duration);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🕒 Slowmode Set / Slowmode activé")
      .setDescription(`This channel now has a ${duration}s slowmode.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};