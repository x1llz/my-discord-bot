const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Display information about the server.",
    async execute(message) {
        const { guild } = message;

        const embed = new EmbedBuilder()
            .setColor("Purple")
            .setTitle(`🏠 Server Info: ${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: "🆔 ID", value: guild.id, inline: true },
                { name: "👑 Owner", value: `<@${guild.ownerId}>`, inline: true },
                { name: "📆 Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "👥 Members", value: `${guild.memberCount}`, inline: true },
                { name: "💬 Channels", value: `${guild.channels.cache.size}`, inline: true },
                { name: "🎭 Roles", value: `${guild.roles.cache.size}`, inline: true }
            )
            .setFooter({ text: `Requested by ${message.author.tag}` })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
