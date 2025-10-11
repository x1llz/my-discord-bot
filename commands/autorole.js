const db = new Map(); // temporary memory storage

module.exports = {
  name: "autorole",
  description: "Set or show autorole for new members.",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageRoles"))
      return message.reply("❌ You need `Manage Roles` permission.");

    const role = message.mentions.roles.first();
    if (!role) return message.reply("⚠️ Mention a role to set as autorole.");

    db.set(message.guild.id, role.id);
    message.reply(`✅ Autorole set to **${role.name}**!`);
  },
};
