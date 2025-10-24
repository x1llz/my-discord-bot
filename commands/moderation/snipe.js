const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

let lastDeleted = new Map(); // stores last deleted message per channel

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("Show the last deleted message from this channel (5min limit).")
    .setDMPermission(false),

  async execute(interaction) {
    const snipe = lastDeleted.get(interaction.channel.id);

    if (!snipe)
      return interaction.reply({
        content: "⚠️ No recent deleted message found.",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setAuthor({ name: snipe.authorTag, iconURL: snipe.authorAvatar })
      .setDescription(snipe.content || "*No content*")
      .setFooter({ text: `Deleted ${Math.floor((Date.now() - snipe.time) / 1000)}s ago` });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

// Event (put in events/messageDelete.js):
// const { Events } = require("discord.js");
// module.exports = {
//   name: Events.MessageDelete,
//   async execute(message) {
//     if (!message.content || !message.author) return;
//     lastDeleted.set(message.channel.id, {
//       content: message.content,
//       authorTag: message.author.tag,
//       authorAvatar: message.author.displayAvatarURL(),
//       time: Date.now(),
//     });
//     setTimeout(() => lastDeleted.delete(message.channel.id), 5 * 60 * 1000); // delete after 5 min
//   },
// }; 