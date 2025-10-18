import { EmbedBuilder } from "discord.js";

export default {
  name: "snipe",
  description: "Show the last deleted message 👀",
  async execute(message, args, client) {
    const sniped = client.snipes.get(message.channel.id);
    if (!sniped) return message.reply("❌ There's nothing to snipe here.");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setAuthor({ name: sniped.author.tag, iconURL: sniped.author.displayAvatarURL() })
      .setDescription(sniped.content || "*No text*")
      .setFooter({ text: `Deleted <t:${Math.floor(sniped.time / 1000)}:R> | Made by X1LLZ | discord.gg/hellz` });

    if (sniped.image) embed.setImage(sniped.image);

    return message.channel.send({ embeds: [embed] });
  },
};