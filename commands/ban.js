const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban a user from the server.",
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers))
            return message.reply("❌ You don't have permission to ban members.");

        const user = message.mentions.users.first();
        if (!user) return message.reply("⚠️ You must mention someone to ban.");

        const member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply("❌ That user is not in this server.");

        await member.ban({ reason: "Banned by bot command." });

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("🚨 Member Banned")
            .setDescription(`**${user.tag}** has been banned by **${message.author.tag}**`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
