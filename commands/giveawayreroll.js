import { EmbedBuilder } from "discord.js";

export default {
  name: "giveawayreroll",
  description: "Reroll a giveaway winner.",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages"))
      return message.reply("❌ You don't have permission to reroll giveaways.");

    const msg = await message.channel.messages.fetch(args[0]).catch(() => null);
    if (!msg) return message.reply("⚠️ Message ID invalid or not found.");

    const users = await msg.reactions.cache.get("🎉").users.fetch();
    const winner = users.filter(u => !u.bot).random();
    message.channel.send(winner ? `🎉 New winner: ${winner}!` : "❌ No new winner found.");
  },
};