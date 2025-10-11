const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "poll",
  description: "Create a poll with custom answers.",
  async execute(message, args) {
    const question = args.join(" ");
    if (!question) return message.reply("Please enter a poll question.");

    const embed = new EmbedBuilder()
      .setTitle("📊 Poll")
      .setDescription(question)
      .setColor("#00BFFF");

    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react("✅");
    await msg.react("❌");
  },
};
