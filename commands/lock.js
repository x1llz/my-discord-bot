module.exports = {
    name: 'lock',
    description: 'Lock the current channel',
    async execute(message) {
        if (!message.member.permissions.has("ManageChannels")) {
            return message.reply("❌ You don’t have permission to lock channels.");
        }

        await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
        message.reply("🔒 Channel has been locked!");
    },
};
