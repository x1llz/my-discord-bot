const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Show last deleted message in this channel.",
  async execute(message, args, client) {
    const snipe = client.snipes?.get(message.channel.id);
    if (!snipe) return message.reply("❌ There's nothing to snipe in this channel.");

    const embed = new EmbedBuilder()
      .setAuthor({ name: snipe.author.tag, iconURL: snipe.author.displayAvatarURL({ dynamic: true }) })
      .setDescription(snipe.content || "‎(embed only / attachment only)")
      .setColor("DarkBlue")
      .setFooter({ text: `Deleted • ${new Date(snipe.time).toLocaleString()}` });

    if (snipe.image) embed.setImage(snipe.image);

    return message.reply({ embeds: [embed] });
  },
};
