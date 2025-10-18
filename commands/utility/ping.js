const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check the bot's latency 🛰️",
  async execute(message) {
    const sent = await message.channel.send("🏓 Pinging...");
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(message.client.ws.ping);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🏓 Pong!")
      .setDescription(`📶 **Latency:** ${latency}ms\n💻 **API:** ${apiLatency}ms`)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    sent.edit({ content: " ", embeds: [embed] });
  },
};