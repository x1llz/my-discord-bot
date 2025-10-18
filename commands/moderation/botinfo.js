import { EmbedBuilder } from "discord.js";

export default {
  name: "botinfo",
  description: "Show bot information and stats 🤖",
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle("🤖 Bot Information")
      .addFields(
        { name: "Username", value: `${client.user.tag}`, inline: true },
        { name: "ID", value: `${client.user.id}`, inline: true },
        { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
        { name: "Users", value: `${client.users.cache.size}`, inline: true },
        { name: "Uptime", value: `${Math.floor(process.uptime() / 60)}m`, inline: true },
        { name: "Node", value: `${process.version}`, inline: true }
      )
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" })
      .setTimestamp();

    return message.channel.send({ embeds: [embed] });
  },
};