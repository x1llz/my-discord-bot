const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "mods",
  description: "List server moderators (users with mod perms)",
  async execute(message) {
    if (!message.guild) return;
    // perms considered as moderator: KickMembers / BanMembers / ManageMessages / ModerateMembers
    const mods = message.guild.members.cache.filter(m => {
      try {
        return (
          m.permissions.has(PermissionFlagsBits.KickMembers) ||
          m.permissions.has(PermissionFlagsBits.BanMembers) ||
          m.permissions.has(PermissionFlagsBits.ManageMessages) ||
          m.permissions.has(PermissionFlagsBits.ModerateMembers)
        );
      } catch { return false; }
    });

    if (!mods.size) return message.reply("No moderators found.");

    const list = mods.map(m => `${m.user.tag} — \`${m.user.id}\``).join("\n");
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🛡️ Server Moderators")
      .setDescription(list)
      .setFooter({ text: `Requested by ${message.author.tag}` })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};