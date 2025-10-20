import { EmbedBuilder } from "discord.js";

export default {
  name: "website",
  description: "Display the official Hellz Market website 🌐",
  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor("#00bfff")
      .setTitle("🌐 Hellz Market")
      .setDescription("Discover exclusive digital products and tools on our official marketplace.")
      .setURL("https://hellz-market.mysellauth.com/")
      .setThumbnail("https://hellz-market.mysellauth.com/assets/favicon.png") // tu peux changer l’image si tu veux
      .addFields([
        { name: "🛒 Visit now:", value: "[hellz-market.mysellauth.com](https://hellz-market.mysellauth.com/)" },
        { name: "💬 Discord:", value: "[Join here](https://discord.gg/hellz)" },
      ])
      .setFooter({ text: "Made by x1llz | discord.gg/hellz", iconURL: message.client.user.displayAvatarURL() });

    await message.channel.send({ embeds: [embed] });
  },
};