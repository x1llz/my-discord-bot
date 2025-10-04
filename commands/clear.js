const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Delete a number of messages in a channel.",
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages))
            return message.reply("❌ You don't have permission to manage messages.");

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount <= 0)
            return message.reply("⚠️ Please specify a valid number of messages to delete.");

        if (amount > 100)
            return message.reply("⚠️ You can only delete up to 100 messages at once.");

        await message.channel.bulkDelete(amount, true);

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("🧹 Messages Cleared")
            .setDescription(`**${amount}** messages have been deleted by **${message.author.tag}**`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 5000);
        });
    },
};
