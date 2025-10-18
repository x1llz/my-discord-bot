import { EmbedBuilder } from "discord.js";

export default {
  name: "dadjoke",
  description: "Get a random dad joke 😂",
  async execute(message) {
    const jokes = [
      "Why don't eggs tell jokes? They'd crack each other up.",
      "I used to play piano by ear, but now I use my hands.",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "How do you organize a space party? You planet!",
      "What did one ocean say to the other? Nothing, they just waved.",
      "Why did the bicycle fall over? It was two-tired.",
      "What do you call fake spaghetti? An impasta!",
      "I would tell you a joke about construction, but I'm still working on it.",
      "I used to hate facial hair, but then it grew on me.",
      "Why can’t your nose be 12 inches long? Because then it would be a foot.",
      "I asked my dog what's two minus two. He said nothing.",
      "Why don’t skeletons fight each other? They don’t have the guts.",
      "Did you hear about the kidnapping at school? It’s fine, he woke up.",
      "Why did the math book look sad? Because it had too many problems.",
      "I only know 25 letters of the alphabet. I don’t know y.",
      "What do you call cheese that isn’t yours? Nacho cheese!",
      "I used to run a dating service for chickens. But I was struggling to make hens meet.",
      "What did one hat say to the other? You stay here, I’ll go on ahead.",
      "Why did the coffee file a police report? It got mugged."
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const embed = new EmbedBuilder()
      .setColor("#00FFFF")
      .setTitle("😂 Random Dad Joke")
      .setDescription(randomJoke)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};