const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Delete multiple messages 🧹 / Supprimer plusieurs messages 🧹",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.reply("❌ You don’t have permission / Tu n’as pas la permission.");

    const count = parseInt(args[0]);
    if (isNaN(count) || count < 1 || count > 100)
      return message.reply("⚠️ Provide a number between 1 and 100 / Donne un nombre entre 1 et 100.");

    await message.channel.bulkDelete(count, true);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🧹 Purge Complete / Purge terminée")
      .setDescription(`Deleted **${count}** messages.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};