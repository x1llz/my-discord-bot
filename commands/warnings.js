const fs = require('fs');
const warningsFile = './warnings.json';

module.exports = {
    name: 'warnings',
    description: 'Show warnings for a user',
    execute(message, args) {
        if (!message.member.permissions.has("ModerateMembers")) {
            return message.reply("❌ You don’t have permission to use this command.");
        }

        const user = message.mentions.users.first();
        if (!user) return message.reply("⚠️ Please mention a user to check warnings.");

        if (!fs.existsSync(warningsFile)) {
            return message.reply("✅ No warnings found.");
        }

        const warnings = JSON.parse(fs.readFileSync(warningsFile));
        const userWarnings = warnings[user.id] || [];

        if (userWarnings.length === 0) {
            return message.reply(`✅ ${user.tag} has no warnings.`);
        }

        let reply = `📋 **Warnings for ${user.tag}:**\n`;
        userWarnings.forEach((warn, index) => {
            reply += `\n**${index + 1}.** ${warn.reason} — by *${warn.moderator}* on *${new Date(warn.date).toLocaleString()}*`;
        });

        message.reply(reply);
    },
};
