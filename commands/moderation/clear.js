const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear messages 🧹 / Supprimer des messages 🧹",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.reply("❌ You don't have permission / Tu n’as pas la permission.");

    const amount = parseInt(args[0]);
    if (!amount || amount < 1 || amount > 100)
      return message.reply("⚠️ Enter a number between 1 and 100 / Entre un nombre entre 1 et 100.");

    await message.channel.bulkDelete(amount, true);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setDescription(`🧹 Deleted / Supprimé **${amount}** messages.`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] }).then((msg) => setTimeout(() => msg.delete(), 4000));
  },
};