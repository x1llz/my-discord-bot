module.exports = {
    name: "mute",
    description: "Mute a user (adds 'Muted' role).",
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute a user in the server.",
  async execute(message, args) {
    // Vérifie les permissions
    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return message.reply("❌ Tu n’as pas la permission de mute des membres.");
    }

    // Vérifie si un utilisateur est mentionné
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("⚠️ Tu dois mentionner un utilisateur à mute.");
    }

    // Récupère le membre dans le serveur
    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply("❌ Cet utilisateur n’est pas dans le serveur.");
    }

    // Empêche de mute un admin
    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("⚠️ Tu ne peux pas mute un administrateur !");
    }

    // Vérifie la durée (ex: +mute @user 10m)
    const durationArg = args[1];
    const durationMs = durationArg
      ? require("ms")(durationArg)
      : 10 * 60 * 1000; // Par défaut : 10 minutes

    if (!durationMs) {
      return message.reply("⚠️ Spécifie une durée valide (ex: `+mute @user 10m`).");
    }

    try {
      await member.timeout(durationMs, `Muté par ${message.author.tag}`);

      const embed = new EmbedBuilder()
        .setColor("Orange")
        .setTitle("🔇 Membre Muté")
        .setDescription(`**${user.tag}** a été muté pendant **${args[1] || "10m"}** par **${message.author.tag}**.`)
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue lors du mute.");
    }
  },
};
