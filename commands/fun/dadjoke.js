const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dadjoke",
  description: "Get a random dad joke 😂 / Obtiens une blague de papa 😂",
  async execute(message) {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    const data = await res.json();

    const embed = new EmbedBuilder()
      .setColor("#4db8ff")
      .setTitle("😂 Dad Joke / Blague de papa 😂")
      .setDescription(`> ${data.joke}`)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};