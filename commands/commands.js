const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "commands",
  description: "Show all available commands.",
  async execute(message) {
    const commands = Array.from(message.client.commands.keys()).sort();
    const embed = new EmbedBuilder()
      .setTitle("📜 Available Commands")
      .setDescription(commands.map(cmd => `\`${cmd}\``).join(" • "))
      .setColor("#FF69B4")
      .setFooter({ text: `Total: ${commands.length} commands` });

    message.reply({ embeds: [embed] });
  },
};
