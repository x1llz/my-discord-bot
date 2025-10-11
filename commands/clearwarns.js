const fs = require('fs');
const warningsFile = './warnings.json';

module.exports = {
    name: 'clearwarns',
    description: 'Clear all warnings for a user',
    execute(message, args) {
        if (!message.member.permissions.has("ModerateMembers")) {
            return message.reply("❌ You don’t have permission to use this command.");
        }

        const user = message.mentions.users.first();
        if (!user) return message.reply("⚠️ Please mention a user to clear warnings.");

        if (!fs.existsSync(warningsFile)) {
            return message.reply("✅ There are no warnings recorded.");
        }

        const warnings = JSON.parse(fs.readFileSync(warningsFile));

        if (!warnings[user.id]) {
            return message.reply(`✅ ${user.tag} has no warnings to clear.`);
        }

        delete warnings[user.id];
        fs.writeFileSync(warningsFile, JSON.stringify(warnings, null, 2));

        message.reply(`🧹 All warnings for **${user.tag}** have been cleared.`);
    },
};
