import { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export default {
  name: "leave",
  description: "Make the bot leave a server (Owner only) 🚪",
  async execute(message) {
    const ownerId = "1187100546683899995"; // ton ID Discord
    if (message.author.id !== ownerId)
      return message.reply("❌ Only the bot owner can use this command.");

    const guilds = [...message.client.guilds.cache.values()];

    if (!guilds.length)
      return message.reply("⚠️ The bot is not in any server.");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("select_leave_guild")
      .setPlaceholder("Select a server to leave")
      .addOptions(
        guilds.map(g => ({
          label: g.name.substring(0, 100),
          value: g.id,
        }))
      );

    const row = new ActionRowBuilder().addComponents(menu);
    const embed = new EmbedBuilder()
      .setColor("#e74c3c")
      .setTitle("🚪 Leave Server")
      .setDescription("Select a server below for the bot to leave it.")
      .setFooter({ text: "Hellz V2 | Owner Panel" });

    const msg = await message.channel.send({ embeds: [embed], components: [row] });

    const collector = msg.createMessageComponentCollector({
      filter: (i) => i.user.id === message.author.id,
      time: 30000,
    });

    collector.on("collect", async (interaction) => {
      const guild = message.client.guilds.cache.get(interaction.values[0]);
      if (!guild)
        return interaction.reply({ content: "❌ Server not found.", ephemeral: true });

      await guild.leave();
      await interaction.reply({ content: `✅ Left server **${guild.name}**`, ephemeral: true });
    });
  },
};