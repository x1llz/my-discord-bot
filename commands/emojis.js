const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "emojis",
  description: "List all server emojis 😄",
  async execute(message) {
    const emojis = message.guild.emojis.cache.map((e) => e.toString()).join(" ");
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("😄 Server Emojis")
      .setDescription(emojis || "No emojis in this server!")
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};