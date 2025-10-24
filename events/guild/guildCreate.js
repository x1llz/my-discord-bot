const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    console.log(`🟢 Joined new server: ${guild.name} (${guild.id})`);

    // === Send welcome embed in the system channel if it exists ===
    const systemChannel = guild.systemChannel;
    if (!systemChannel) return;

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("🌊 Thanks for adding Hellz!")
      .setDescription(
        "Use `/help` to view all commands.\n" +
        "Visit **hellz-market.mysellauth.com** for our marketplace.\n\n" +
        "Need support? Join our Discord: **.gg/hellz**"
      )
      .setFooter({ text: "Hellz Bot V3" })
      .setTimestamp();

    try {
      await systemChannel.send({ embeds: [embed] });
    } catch (err) {
      console.log(`⚠️ Could not send welcome embed in ${guild.name}`);
    }
  },
};