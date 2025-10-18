import { PermissionFlagsBits } from "discord.js";

export default {
  name: "purge",
  description: "Bulk delete messages (alias of clear)",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.reply("❌ You don't have permission to purge messages.");

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100)
      return message.reply("⚠️ Provide a number between 1 and 100.");

    try {
      await message.channel.bulkDelete(amount, true);
      const confirmation = await message.channel.send(`🧼 Purged **${amount}** messages.`);
      setTimeout(() => confirmation.delete().catch(() => {}), 3000);
    } catch (err) {
      console.error(err);
      return message.reply("❌ Failed to purge messages.");
    }
  },
};