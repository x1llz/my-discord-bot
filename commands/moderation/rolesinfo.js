import { EmbedBuilder } from "discord.js";

export default {
  name: "rolesinfo",
  description: "Show all roles in the server",
  async execute(message) {
    const roles = message.guild.roles.cache
      .filter(r => r.name !== "@everyone")
      .map(r => `${r.name} (${r.id})`)
      .join("\n") || "No roles.";

    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("📜 Server Roles")
      .setDescription(roles)
      .setFooter({ text: `Server: ${message.guild.name}` });

    return message.channel.send({ embeds: [embed] });
  },
};