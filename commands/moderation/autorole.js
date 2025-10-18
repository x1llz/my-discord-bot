const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "autorole",
  description: "Set or remove an autorole for new members 🎯",
  async execute(message, args, client) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.reply("❌ You don't have permission to manage roles.");

    const role = message.mentions.roles.first();
    if (!role) return message.reply("⚠️ Mention a role to set as autorole.");

    client.autorole = role.id;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🎯 Autorole Set")
      .setDescription(`New members will automatically receive the role **${role.name}**.`)
      .setFooter({ text: `Configured by ${message.author.tag}` });

    message.channel.send({ embeds: [embed] });
  },
};