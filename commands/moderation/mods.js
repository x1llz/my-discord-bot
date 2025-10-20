import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "mods",
  description: "Displays all staff members and their roles 👑",
  async execute(message) {
    const guild = message.guild;
    if (!guild) return message.reply("⚠️ This command can only be used in a server.");

    // --- CONFIG ---
    const botOwnerId = "1187100546683899995"; // 👑 ton ID Discord ici
    const owners = guild.members.cache.filter(m =>
      m.roles.cache.some(r => r.name.toLowerCase().includes("owner")) ||
      m.permissions.has(PermissionFlagsBits.Administrator)
    );

    const admins = guild.members.cache.filter(m =>
      m.permissions.has(PermissionFlagsBits.Administrator) && !owners.has(m.id)
    );

    const mods = guild.members.cache.filter(m =>
      (m.permissions.has(PermissionFlagsBits.KickMembers) ||
        m.permissions.has(PermissionFlagsBits.BanMembers) ||
        m.permissions.has(PermissionFlagsBits.ModerateMembers)) &&
      !admins.has(m.id) &&
      !owners.has(m.id)
    );

    const botCreator = await guild.members.fetch(botOwnerId).catch(() => null);

    // --- EMBED ---
    const embed = new EmbedBuilder()
      .setColor("#2b6cb0")
      .setTitle("👑 Hellz Staff Members")
      .setDescription("Here are all the users with moderation or administrative permissions.")
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

    message.channel.send({ embeds: [embed] });
  },
};