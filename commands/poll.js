import { EmbedBuilder } from "discord.js";

export default {
  name: "poll",
  description: "Create a poll.",
  async execute(message, args) {
    const question = args.join(" ");
    if (!question) return message.reply("❌ Please provide a poll question.");

    const embed = new EmbedBuilder()
      .setColor("#9b59b6")
      .setTitle("🗳️ New Poll")
      .setDescription(question)
      .setFooter({ text: `Poll created by ${message.author.tag}` });

    const pollMsg = await message.channel.send({ embeds: [embed] });
    await pollMsg.react("✅");
    await pollMsg.react("❌");
  },
};