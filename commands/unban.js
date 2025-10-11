const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban a user by their ID.",
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers))
            return message.reply("❌ You don't have permission to unban members.");

        const userId = args[0];
        if (!userId) return message.reply("⚠️ Please provide the ID of the user to unban.");

        try {
            await message.guild.members.unban(userId);

            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle("✅ Member Unbanned")
                .setDescription(`User with ID **${userId}** has been unbanned by **${message.author.tag}**`)
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            message.reply("❌ I couldn't unban that user. Check the ID or permissions.");
        }
    },
};
