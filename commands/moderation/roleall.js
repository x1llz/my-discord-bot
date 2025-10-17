const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "roleall",
  description: "Give a role to everyone 👥 / Donner un rôle à tout le monde 👥",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.reply("❌ You don’t have permission / Tu n’as pas la permission.");

    const role = message.mentions.roles.first();
    if (!role)
      return message.reply("⚠️ Mention a role / Mentionne un rôle.");

    const members = await message.guild.members.fetch();
    members.forEach((m) => {
      if (!m.user.bot) m.roles.add(role).catch(() => {});
    });

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("👥 Role Added to Everyone / Rôle ajouté à tout le monde")
      .setDescription(`Everyone received the role **${role.name}**.`)
      .setFooter({ text: `By ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};