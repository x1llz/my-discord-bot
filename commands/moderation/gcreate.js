const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gcreate")
    .setDescription("Create a giveaway.")
    .addStringOption((opt) =>
      opt.setName("prize").setDescription("Giveaway prize").setRequired(true)
    )
    .addStringOption((opt) =>
      opt
        .setName("duration")
        .setDescription("Duration (e.g. 10m, 1h, 1d)")
        .setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt.setName("winners").setDescription("Number of winners").setRequired(true)
    )
    .addChannelOption((opt) =>
      opt
        .setName("channel")
        .setDescription("Channel where to post the giveaway")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction) {
    const prize = interaction.options.getString("prize");
    const duration = interaction.options.getString("duration");
    const winners = interaction.options.getInteger("winners");
    const channel = interaction.options.getChannel("channel");

    const timeMap = { m: 60000, h: 3600000, d: 86400000 };
    const match = duration.match(/^(\d+)([mhd])$/);
    if (!match)
      return interaction.reply({
        content: "❌ Invalid duration format. Use 10m, 1h, or 1d.",
        ephemeral: true,
      });

    const ms = parseInt(match[1]) * timeMap[match[2]];
    const end = Date.now() + ms;

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🎉 Giveaway!")
      .setDescription(`**Prize:** ${prize}\nReact 🎉 to enter!\n**Winners:** ${winners}`)
      .setFooter({ text: `Ends in ${duration}` })
      .setTimestamp(end);

    const msg = await channel.send({ embeds: [embed] });
    await msg.react("🎉");

    await interaction.reply({
      content: `✅ Giveaway for **${prize}** started in ${channel}.`,
      ephemeral: true,
    });

    setTimeout(async () => {
      const message = await channel.messages.fetch(msg.id).catch(() => null);
      if (!message) return;

      const users = await message.reactions.cache
        .get("🎉")
        ?.users.fetch()
        .catch(() => null);

      const entries = users?.filter((u) => !u.bot).map((u) => u.id) || [];

      if (entries.length === 0)
        return channel.send("❌ No valid participants. Giveaway cancelled.");

      const winnersList = [];
      for (let i = 0; i < winners && entries.length > 0; i++) {
        const winner = entries.splice(Math.floor(Math.random() * entries.length), 1)[0];
        winnersList.push(`<@${winner}>`);
      }

      await channel.send(
        `🎉 Congratulations ${winnersList.join(", ")}! You won **${prize}**!`
      );
    }, ms);
  },
};