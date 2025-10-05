const fs = require('fs');
const path = require('path');
const ownersPath = path.join(__dirname, '../data/owners.json');

module.exports = {
    name: 'removeowner',
    description: 'Retire un utilisateur de la liste des owners du bot',
    async execute(message, args) {
        // Vérifie que l'auteur est owner
        if (!fs.existsSync(ownersPath)) fs.writeFileSync(ownersPath, JSON.stringify([]));
        const owners = JSON.parse(fs.readFileSync(ownersPath));

        if (!owners.includes(message.author.id))
            return message.reply('❌ Tu dois être un owner pour utiliser cette commande.');

        // Vérifie qu'un utilisateur est mentionné
        if (!args[0]) return message.reply('❌ Spécifie un utilisateur à retirer (mention ou ID).');

        const user = message.mentions.users.first() || await message.client.users.fetch(args[0]).catch(() => null);
        if (!user) return message.reply('❌ Utilisateur introuvable.');

        if (!owners.includes(user.id))
            return message.reply('⚠️ Cet utilisateur n\'est pas dans la liste des owners.');

        // Retire le user
        const newOwners = owners.filter(id => id !== user.id);
        fs.writeFileSync(ownersPath, JSON.stringify(newOwners, null, 2));

        message.reply(`✅ ${user.tag} a été retiré de la liste des owners.`);
    },
};
