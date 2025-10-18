import { PermissionFlagsBits } from "discord.js";

export default {
  name: "clear",
  description: "Delete multiple messages (alias: purge)",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.reply("❌ You don't have permission to delete messages.");

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100)
      return message.reply("⚠️ Provide a number between 1 and 100.");

    try {
      await message.channel.bulkDelete(amount, true);
      const confirmation = await message.channel.send(`🧹 Deleted **${amount}** messages.`);
      setTimeout(() => confirmation.delete().catch(() => {}), 3000);
    } catch (err) {
      console.error(err);
      return message.reply("❌ Failed to delete messages (some messages may be older than 14 days).");
    }
  },
};