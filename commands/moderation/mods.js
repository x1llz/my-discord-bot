import { EmbedBuilder } from "discord.js";

export default {
  name: "mods",
  description: "Displays all staff members and their roles 👑",
  async execute(message) {
    // Empêche l’exécution double (souvent causée par les partials ou events dupliqués)
    if (message._alreadyProcessed) return;
    message._alreadyProcessed = true;

    const guild = message.guild;
    if (!guild) return message.reply("⚠️ This command can only be used inside a server.");

    const botOwnerId = "1187100546683899995"; // 👑 ton ID Discord ici

    // Cherche les rôles (case-insensitive)
    const adminRole = guild.roles.cache.find(r => r.name.toLowerCase().includes("admin"));
    const modRole = guild.roles.cache.find(r => r.name.toLowerCase().includes("mod"));
    const ownerRole = guild.roles.cache.find(r => r.name.toLowerCase().includes("owner"));

    // Membres par rôles
    const owners = ownerRole
      ? guild.members.cache.filter(m => m.roles.cache.has(ownerRole.id))
      : new Map();

    const admins = adminRole
      ? guild.members.cache.filter(m => m.roles.cache.has(adminRole.id))
      : new Map();

    const mods = modRole
      ? guild.members.cache.filter(m => m.roles.cache.has(modRole.id))
      : new Map();

    const botCreator = await guild.members.fetch(botOwnerId).catch(() => null);

    // Embed propre
    const embed = new EmbedBuilder()
      .setColor("#2b6cb0")
      .setTitle("👑 Hellz Staff Members")
      .setDescription("Here are all users with staff roles on this server.")
      .addFields(
        botCreator
          ? { name: "💻 Bot's Creator", value: `${botCreator.user.tag}`, inline: false }
          : { name: "💻 Bot's Creator", value: "Not found", inline: false },
        { name: "👑 Owners", value: owners.size ? owners.map(m => `• ${m.user.tag}`).join("\n") : "None", inline: false },
        { name: "🛡️ Administrators", value: admins.size ? admins.map(m => `• ${m.user.tag}`).join("\n") : "None", inline: false },
        { name: "🔧 Moderators", value: mods.size ? mods.map(m => `• ${m.user.tag}`).join("\n") : "None", inline: false }
      )
      .setFooter({ text: "Made by X1LLZ 💻 | Hellz Bot", iconURL: message.client.user.displayAvatarURL() })
      .setTimestamp();

    return message.channel.send({ embeds: [embed] });
  },
};