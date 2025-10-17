const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "autorole",
  description: "Set an automatic role for new members 🧩 / Définir un rôle automatique pour les nouveaux membres",
  async execute(message, args, client) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.reply("❌ You don’t have permission / Tu n’as pas la permission.");

    const role = message.mentions.roles.first();
    if (!role) return message.reply("⚠️ Mention a role / Mentionne un rôle.");

    client.autorole = role.id;

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🧩 Auto Role Set / Rôle automatique défini")
      .setDescription(`New members will automatically receive the role **${role.name}**.`)
      .setFooter({ text: `Set by ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};

// This should be placed in your main event listener:
 // client.on("guildMemberAdd", member => {
 //   const roleId = client.autorole;
 //   if (roleId) {
 //     const role = member.guild.roles.cache.get(roleId);
 //     if (role) member.roles.add(role).catch(console.error);
 //   }
 // });