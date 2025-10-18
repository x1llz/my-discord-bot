const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Bulk delete messages quickly 🧼",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.reply("❌ You don't have permission to manage messages.");

    const amount = parseInt(args[0]);
    if (!amount || amount < 1 || amount > 100)
      return message.reply("⚠️ You must provide a number between 1 and 100.");

    await message.channel.bulkDelete(amount, true);
    message.channel
      .send(`🧼 Deleted **${amount}** messages.`)
      .then((msg) => setTimeout(() => msg.delete(), 3000));
  },
};