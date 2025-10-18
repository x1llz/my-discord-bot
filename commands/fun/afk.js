const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "afk",
  description: "Set your AFK status 😴",
  async execute(message, args, client) {
    const reason = args.join(" ") || "No reason provided";
    client.afk.set(message.author.id, { reason, since: Date.now() });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("😴 AFK Enabled")
      .setDescription(`> You are now AFK: **${reason}**`)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};