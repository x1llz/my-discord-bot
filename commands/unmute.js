const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "unmute",
    description: "Unmute a user by removing the 'Muted' role.",
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles))
            return message.reply("❌ You don't have permission to manage roles.");

        const user = message.mentions.users.first();
        if (!user) return message.reply("⚠️ You must mention someone to unmute.");

        const member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply("❌ That user is not in this server.");

        const role = message.guild.roles.cache.find(r => r.name === "Muted");
        if (!role) return message.reply("⚠️ No 'Muted' role found.");

        await member.roles.remove(role);

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("🔊 Member Unmuted")
            .setDescription(`**${user.tag}** has been unmuted by **${message.author.tag}**`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
