const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "commands",
  description: "Show all commands (alias of help) 🔎",
  async execute(message) {
    const cmds = message.client.commands;
    if (!cmds || !cmds.size) return message.reply("No commands loaded.");

    const list = cmds.map(c => `• \`+${c.name}\` — ${c.description || "No description"}`).join("\n");
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📚 All Commands")
      .setDescription(list)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};