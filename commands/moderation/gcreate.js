// commands/moderation/gcreate.js
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gcreate")
    .setDescription("Create a giveaway")
    .addStringOption(opt =>
      opt.setName("name").setDescription("Name of the giveaway").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("duration").setDescription("Duration (e.g. 10m, 1h, 2d)").setRequired(true)
    )
    .addIntegerOption(opt =>
      opt.setName("winners").setDescription("Number of winners").setRequired(true)
    )
    .addChannelOption(opt =>
      opt.setName("channel").setDescription("Channel where to host the giveaway").setRequired(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString("name");
    const duration = interaction.options.getString("duration");
    const winners = interaction.options.getInteger("winners");
    const channel = interaction.options.getChannel("channel");

    const time = ms(duration);
    if (!time || time < 10000)
      return interaction.reply({ content: "❌ Invalid duration format.", ephemeral: true });

    const end = Date.now() + time;

    const embed = new EmbedBuilder()
      .setTitle("🎉 Giveaway Started!")
      .setDescription(`**Prize:** ${name}\nReact with 🎉 to enter!\n\n**Winners:** ${winners}\n**Ends:** <t:${Math.floor(end / 1000)}:R>`)
      .setColor("#00BFFF")
      .setFooter({ text: `Hosted by ${interaction.user.tag}` })
      .setTimestamp();

    const msg = await channel.send({ embeds: [embed] });
    await msg.react("🎉");

    await interaction.reply({ content: `✅ Giveaway started in ${channel}`, ephemeral: true });

    setTimeout(async () => {
      const fetched = await msg.fetch();
      const reactions = fetched.reactions.cache.get("🎉");
      if (!reactions) return channel.send("❌ No one reacted, no winners.");

      const users = await reactions.us
