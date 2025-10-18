const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dadjoke",
  description: "Get a random dad joke 😂",
  async execute(message) {
    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("😂 Random Dad Joke")
        .setDescription(`> ${data.joke}`)
        .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

      message.channel.send({ embeds: [embed] });
    } catch {
      message.reply("⚠️ Couldn't fetch a dad joke right now.");
    }
  },
};