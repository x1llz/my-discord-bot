const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows all available commands in an embed format.",
    execute(message, args) {
        const embed = new EmbedBuilder()
            .setColor("#5865F2") // Bleu Discord
            .setTitle("📜 Command List")
            .setDescription("Here are all available commands for this bot:")
            .addFields(
                { name: "🆘 +help", value: "Displays this help message.", inline: false },
                { name: "👢 +kick @user", value: "Kick a user from the server.", inline: false },
                { name: "⛔ +ban @user", value: "Ban a user from the server.", inline: false },
                { name: "🔇 +mute @user", value: "Mute a user by assigning a 'Muted' role.", inline: false },
                { name: "🔊 +unmute @user", value: "Unmute a user by removing the 'Muted' role.", inline: false }
            )
            .setFooter({ text: "Developed with ❤️ by x1llz", iconURL: message.client.user.displayAvatarURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
