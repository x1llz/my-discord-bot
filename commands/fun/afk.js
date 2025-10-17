const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "afk",
  description: "Set your AFK status 💤 / Mets-toi en AFK 💤",
  async execute(message, args, client) {
    const reason = args.join(" ") || "No reason / Aucune raison";

    client.afk.set(message.author.id, { reason, since: Date.now() });

    const embed = new EmbedBuilder()
      .setColor("#4db8ff")
      .setTitle("💤 AFK Mode Enabled / Mode AFK activé")
      .setDescription(`> **${message.author.username}** is now AFK.\n> Reason / Raison : **${reason}**`)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};