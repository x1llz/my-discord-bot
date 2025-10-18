const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "poll",
  description: "Create a poll 🗳️",
  async execute(message, args) {
    const question = args.join(" ");
    if (!question) return message.reply("⚠️ You must provide a question!");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📊 Poll Time!")
      .setDescription(`> **${question}**\n\n✅ = Yes\n❌ = No`)
      .setFooter({ text: `Poll created by ${message.author.tag}` });

    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react("✅");
    await msg.react("❌");
  },
};