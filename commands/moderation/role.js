import { PermissionFlagsBits } from "discord.js";

export default {
  name: "role",
  description: "Add or remove a role from a user. Usage: +role @user @role",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.reply("❌ You don't have permission to manage roles.");

    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member || !role) return message.reply("⚠️ Usage: `+role @user @role`");

    try {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        return message.channel.send(`❌ Removed **${role.name}** from ${member.user.tag}`);
      } else {
        await member.roles.add(role);
        return message.channel.send(`✅ Added **${role.name}** to ${member.user.tag}`);
      }
    } catch (err) {
      console.error(err);
      return message.reply("❌ Failed to modify roles. Make sure I have Manage Roles permission.");
    }
  },
};