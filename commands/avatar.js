module.exports = {
    name: 'avatar',
    description: 'Show the avatar of a user',
    execute(message) {
        const user = message.mentions.users.first() || message.author;
        message.reply({
            embeds: [
                {
                    title: `${user.username}'s Avatar`,
                    image: { url: user.displayAvatarURL({ dynamic: true, size: 1024 }) },
                    color: 0x3498db
                }
            ]
        });
    },
};
