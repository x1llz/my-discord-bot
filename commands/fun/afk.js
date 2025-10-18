import { EmbedBuilder } from "discord.js";

export default {
  name: "afk",
  description: "Set yourself as AFK 💤",
  async execute(message, args, client) {
    const reason = args.join(" ") || "AFK";
    client.afk.set(message.author.id, { reason, since: Date.now() });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("💤 AFK Mode Enabled")
      .setDescription(`You're now AFK: **${reason}**`)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    return message.channel.send({ embeds: [embed] });
  },
};