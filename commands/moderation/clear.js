import { PermissionFlagsBits } from "discord.js";

export default {
  name: "clear",
  description: "Delete a number of messages 🧹",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.reply("❌ You don’t have permission to delete messages.");

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100)
      return message.reply("⚠️ Enter a number between 1 and 100.");

    await message.channel.bulkDelete(amount, true);
    const reply = await message.channel.send(`✅ Deleted **${amount}** messages.`);
    setTimeout(() => reply.delete().catch(() => {}), 3000);
  },
};