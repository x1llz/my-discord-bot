module.exports = {
    name: 'uptime',
    description: 'Show how long the bot has been online',
    execute(message) {
        const totalSeconds = process.uptime();
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        message.reply(`🕒 Uptime: **${hours}h ${minutes}m ${seconds}s**`);
    },
};
