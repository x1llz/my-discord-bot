module.exports = {
    name: 'purge',
    description: 'Delete multiple messages',
    async execute(message, args) {
        if (!message.member.permissions.has("ManageMessages")) {
            return message.reply("❌ You don’t have permission to delete messages.");
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0 || amount > 100) {
            return message.reply("⚠️ Please provide a number between 1 and 100.");
        }

        await message.channel.bulkDelete(amount, true);
        message.reply(`🧹 Deleted **${amount}** messages.`).then(msg => setTimeout(() => msg.delete(), 3000));
    },
};

