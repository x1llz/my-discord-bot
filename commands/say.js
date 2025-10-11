module.exports = {
    name: 'say',
    description: 'Make the bot say something',
    execute(message, args) {
        if (!message.member.permissions.has("ManageMessages")) {
            return message.reply("❌ You don’t have permission to use this command.");
        }

        const text = args.join(' ');
        if (!text) return message.reply("⚠️ Please provide a message to send.");
        message.delete().catch(() => {});
        message.channel.send(text);
    },
};
