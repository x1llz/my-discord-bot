import { EmbedBuilder } from "discord.js";

export default {
  name: "giveaway",
  description: "Start a giveaway.",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages"))
      return message.reply("❌ You don't have permission to start a giveaway.");

    const duration = args[0];
    const prize = args.slice(1).join(" ");
    if (!duration || !prize)
      return message.reply("⚠️ Usage: +giveaway <duration> <prize>");

    const embed = new EmbedBuilder()
      .setColor("#f1c40f")
      .setTitle("🎉 Giveaway Started!")
      .setDescription(`Prize: **${prize}**\nDuration: **${duration}**\nReact with 🎉 to enter!`)
      .setFooter({ text: "Good luck everyone!" });

    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react("🎉");

    setTimeout(async () => {
      const users = await msg.reactions.cache.get("🎉").users.fetch();
      const winner = users.filter(u => !u.bot).random();
      message.channel.send(winner ? `🎉 Congratulations ${winner}! You won **${prize}**!` : "❌ No winner.");
    }, ms(duration));
  },
};