module.exports = {
    name: 'slowmode',
    description: 'Set slowmode delay in seconds',
    async execute(message, args) {
        if (!message.member.permissions.has("ManageChannels")) {
            return message.reply("❌ You don’t have permission to set slowmode.");
        }

        const seconds = parseInt(args[0]);
        if (isNaN(seconds) || seconds < 0) {
            return message.reply("⚠️ Please provide a valid number of seconds.");
        }

        await message.channel.setRateLimitPerUser(seconds);
        message.reply(`🐢 Slowmode set to **${seconds} seconds**.`);
    },
};
