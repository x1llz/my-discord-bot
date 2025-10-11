module.exports = {
  name: "roleall",
  description: "Give a role to everyone.",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageRoles"))
      return message.reply("❌ You don't have permission.");

    const role = message.mentions.roles.first();
    if (!role) return message.reply("Please mention a role.");

    message.guild.members.fetch().then(members => {
      members.forEach(m => m.roles.add(role).catch(() => {}));
    });
    message.reply(`✅ Role **${role.name}** added to everyone.`);
  },
};
