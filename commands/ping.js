module.exports = {
    name: 'ping',
    description: 'Check bot latency',
    async execute(message) {
        const sent = await message.channel.send('🏓 Pinging...');
        sent.edit(`🏓 Pong! Latency: **${sent.createdTimestamp - message.createdTimestamp}ms**`);
    },
};
