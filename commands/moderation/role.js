const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "role",
  description: "Give a user a role 🎭 / Donner un rôle à un utilisateur 🎭",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.reply("❌ You don’t have permission / Tu n’as pas la permission.");

    const member = message.mentions.members.first();
    const role = message.mentions.roles.last();
    if (!member || !role)
      return message.reply("⚠️ Usage: `+role @user @role` / Exemple : `+role @user @rôle`");

    await member.roles.add(role);

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🎭 Role Added / Rôle ajouté")
      .setDescription(`**${member.user.tag}** received the role **${role.name}**.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};