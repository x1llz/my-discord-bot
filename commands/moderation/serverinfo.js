const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Show server information 🏷️",
  async execute(message) {
    const g = message.guild;
    const owner = await g.fetchOwner().catch(()=>null);
    const embed = new EmbedBuilder()
      .setColor("#3498db")
      .setTitle(`Server: ${g.name}`)
      .addFields(
        { name: "ID", value: `${g.id}`, inline: true },
        { name: "Owner", value: owner ? `${owner.user.tag}` : "Unknown", inline: true },
        { name: "Members", value: `${g.memberCount}`, inline: true },
        { name: "Channels", value: `${g.channels.cache.size}`, inline: true },
        { name: "Roles", value: `${g.roles.cache.size}`, inline: true },
        { name: "Created", value: `<t:${Math.floor(g.createdTimestamp/1000)}:R>`, inline: true }
      )
      .setThumbnail(g.iconURL({ size: 512 }))
      .setFooter({ text: "Made by X1LLZ | discord.gg/hellz" });

    message.channel.send({ embeds: [embed] });
  },
};