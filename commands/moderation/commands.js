import { EmbedBuilder } from "discord.js";

export default {
  name: "commands",
  description: "List all loaded commands 🔎 (alias of help)",
  async execute(message) {
    const cmds = message.client.commands;
    if (!cmds || !cmds.size) return message.reply("No commands loaded.");

    const list = Array.from(cmds.values())
      .map(c => `• \`+${c.name}\` — ${c.description || "No description"}`)
      .join("\n");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📚 All Commands")
      .setDescription(list)
      .setFooter({ text: `Requested by ${message.author.tag} | Made by X1LLZ` })
      .setTimestamp();

    return message.channel.send({ embeds: [embed] });
  },
};