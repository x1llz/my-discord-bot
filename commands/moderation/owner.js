const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const owners = new Set();

module.exports = {
  name: "owner",
  description: "Add a user as co-owner 👑 / Ajouter un co-owner 👑",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ You must be an admin / Tu dois être admin.");

    const user = message.mentions.users.first();
    if (!user) return message.reply("⚠️ Mention a user / Mentionne un utilisateur.");

    owners.add(user.id);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("👑 New Co-Owner Added / Nouveau co-owner ajouté")
      .setDescription(`**${user.tag}** is now a co-owner.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};