module.exports = {
    name: 'unlock',
    description: 'Unlock the current channel',
    async execute(message) {
        if (!message.member.permissions.has("ManageChannels")) {
            return message.reply("❌ You don’t have permission to unlock channels.");
        }

        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: true });
        message.reply("🔓 Channel has been unlocked!");
    },
};
