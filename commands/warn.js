const fs = require('fs');
const warningsFile = './warnings.json';

module.exports = {
    name: 'warn',
    description: 'Warn a user',
    execute(message, args) {
        if (!message.member.permissions.has("ModerateMembers")) {
            return message.reply("❌ You don’t have permission to use this command.");
        }

        const user = message.mentions.users.first();
        if (!user) return message.reply("⚠️ Please mention a user to warn.");
        const reason = args.slice(1).join(' ') || 'No reason provided.';

        // Load existing warnings
        let warnings = {};
        if (fs.existsSync(warningsFile)) {
            warnings = JSON.parse(fs.readFileSync(warningsFile));
        }

        // Add new warning
        if (!warnings[user.id]) {
            warnings[user.id] = [];
        }

        warnings[user.id].push({
            reason,
            moderator: message.author.tag,
            date: new Date().toISOString()
        });

        fs.writeFileSync(warningsFile, JSON.stringify(warnings, null, 2));
        message.reply(`⚠️ ${user.tag} has been warned. Reason: ${reason}`);
    },
};
