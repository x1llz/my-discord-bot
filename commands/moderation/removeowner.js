const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const owners = new Set();

module.exports = {
  name: "removeowner",
  description: "Remove a co-owner ❌ / Retirer un co-owner ❌",
  async execute(message) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.reply("❌ You must be admin / Tu dois être admin.");

    const user = message.mentions.users.first();
    if (!user) return message.reply("⚠️ Mention a user / Mentionne un utilisateur.");

    if (!owners.has(user.id))
      return message.reply("ℹ️ This user is not a co-owner / Cet utilisateur n’est pas co-owner.");

    owners.delete(user.id);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("❌ Co-Owner Removed / Co-owner retiré")
      .setDescription(`**${user.tag}** is no longer a co-owner.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};