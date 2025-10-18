import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

export default {
  name: "mods",
  description: "List all server moderators 👮",
  async execute(message) {
    const moderators = message.guild.members.cache.filter(m =>
      m.permissions.has(PermissionFlagsBits.ManageMessages)
    );

    const modList = moderators.map(m => `- ${m.user.tag}`).join("\n") || "No moderators found.";

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🛡️ Server Moderators")
      .setDescription(modList)
      .setFooter({ text: "Hellz Bot | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};