const { version } = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Show bot information',
    execute(message, args, client) {
        const embed = {
            color: 0x5865F2,
            title: '🤖 Bot Information',
            fields: [
                { name: 'Bot Name', value: client.user.username, inline: true },
                { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Users', value: `${client.users.cache.size}`, inline: true },
                { name: 'Discord.js', value: `v${version}`, inline: true },
                { name: 'Uptime', value: `${Math.floor(process.uptime() / 60)} minutes`, inline: true },
            ],
            timestamp: new Date(),
        };
        message.reply({ embeds: [embed] });
    },
};
