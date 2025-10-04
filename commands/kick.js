const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick a user from the server.",
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers))
            return message.reply("❌ You don't have permission to kick members.");

        const user = message.mentions.users.first();
        if (!user) return message.reply("⚠️ You must mention someone to kick.");

        const member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply("❌ That user is not in this server.");

        await member.kick("Kicked by bot command.");

        const embed = new EmbedBuilder()
            .setColor("Orange")
            .setTitle("👢 Member Kicked")
            .setDescription(`**${user.tag}** has been kicked by **${message.author.tag}**`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
