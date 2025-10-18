const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "roleall",
  description: "Give a role to everyone in the server 🌍",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.reply("❌ You don't have permission to manage roles.");

    const role = message.mentions.roles.first();
    if (!role) return message.reply("⚠️ Mention a role to give to everyone.");

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🌍 Role All")
      .setDescription(`Giving **${role.name}** to all members...`);

    message.channel.send({ embeds: [embed] });

    message.guild.members.cache.forEach((member) => {
      if (!member.user.bot) member.roles.add(role).catch(() => {});
    });
  },
};