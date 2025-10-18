import { PermissionFlagsBits } from "discord.js";

export default {
  name: "autorole",
  description: "Set the auto-role for new members 🎭",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.reply("❌ You don’t have permission to set roles.");

    const role = message.mentions.roles.first();
    if (!role) return message.reply("⚠️ Mention a role to set as auto-role.");

    message.channel.send(`✅ Auto-role set to **${role.name}**.`);
  },
};