module.exports = {
    name: "mute",
    description: "Mute a user (adds 'Muted' role).",
    async execute(message, args) {
        if (!message.member.permissions.has("ModerateMembers"))
            return message.reply("❌ You don’t have permission to mute members.");

        const user = message.mentions.members.first();
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "mute",
    description: "Mute a user by assigning a 'Muted' role.",
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles))
            return message.reply("❌ You don't have permission to manage roles.");

        const user = message.mentions.users.first();
        if (!user) return message.reply("⚠️ You must mention someone to mute.");

        const member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply("❌ That user is not in this server.");

        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        if (!role) {
            try {
                role = await message.guild.roles.create({
                    name: "Muted",
                    color: "Grey",
                    permissions: [],
                });

                message.guild.channels.cache.forEach(channel => {
                    channel.permissionOverwrites.create(role, {
                        SendMessages: false,
                        Speak: false,
                        AddReactions: false,
                    });
                });
            } catch (err) {
                console.log(err);
                return message.reply("⚠️ I couldn't create the 'Muted' role.");
            }
        }

        await member.roles.add(role);

        const embed = new EmbedBuilder()
            .setColor("Grey")
            .setTitle("🔇 Member Muted")
            .setDescription(`**${user.tag}** has been muted by **${message.author.tag}**`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};

