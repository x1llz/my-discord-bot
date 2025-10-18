import { EmbedBuilder } from "discord.js";

export default {
  name: "8ball",
  description: "Ask the magic 8ball a question 🎱",
  async execute(message, args) {
    const question = args.join(" ");
    if (!question) return message.reply("❓ You must ask a question!");

    const responses = [
      "Yes.", "No.", "Maybe.", "Definitely!", "Never.", "Ask again later.",
      "It’s possible.", "Absolutely not.", "Without a doubt.", "Hmm... I don’t think so."
    ];
    const answer = responses[Math.floor(Math.random() * responses.length)];

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🎱 Magic 8Ball")
      .addFields(
        { name: "Question", value: question },
        { name: "Answer", value: answer }
      )
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    return message.channel.send({ embeds: [embed] });
  },
};