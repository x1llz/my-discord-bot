import { EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

export default {
  name: "dadjoke",
  description: "Get a random dad joke 😂",
  async execute(message) {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("😂 Dad Joke")
      .setDescription(data.joke)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    return message.channel.send({ embeds: [embed] });
  },
};