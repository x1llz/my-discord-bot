module.exports = {
  name: "role",
  description: "Give a role to someone.",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageRoles"))
      return message.reply("❌ You need `Manage Roles` permission.");

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!member) return message.reply("⚠️ Mention a valid user.");

    const roleName = args.slice(1).join(" ");
    if (!roleName) return message.reply("⚠️ Provide a role name.");

    const role =
      message.guild.roles.cache.find(r => r.name === roleName) ||
      message.guild.roles.cache.get(roleName);
    if (!role) return message.reply("⚠️ Role not found.");

    try {
      await member.roles.add(r
