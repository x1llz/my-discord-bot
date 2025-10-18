const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "role",
  description: "Add or remove a role from a user 🎭",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.reply("❌ You don't have permission to manage roles.");

    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member || !role)
      return message.reply("⚠️ Usage: `+role @user @role`");

    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
      message.channel.send(`❌ Removed **${role.name}** from ${member.user.tag}`);
    } else {
      await member.roles.add(role);
      message.channel.send(`✅ Added **${role.name}** to ${member.user.tag}`);
    }
  },
};