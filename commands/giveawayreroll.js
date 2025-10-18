const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "giveawayreroll",
  description: "Reroll a giveaway winner 🔁",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages"))
      return message.reply("❌ You don't have permission to reroll giveaways.");

    const prize = args.join(" ") || "Unknown prize";
    const members = message.guild.members.cache.filter((m) => !m.user.bot);

    if (members.size === 0) return message.reply("⚠️ No members to pick from!");

    const winner = members.random();

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🎉 Giveaway Rerolled!")
      .setDescription(`> 🎊 New winner: **${winner.user.tag}**\n> **Prize:** ${prize}`)
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};