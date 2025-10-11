const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  description: "Mute a user for a specified duration.",
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
      return message.reply("❌ You don’t have permission to mute members.");
    }

    const user = message.mentions.users.first();
    if (!user) return message.reply("⚠️ You must mention a user to mute.");

    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply("❌ That user is not in this server.");

    const duration = args[1];
    if (!duration) return message.reply("⏱️ Please specify a mute duration (e.g. `10m`, `1h`, `1d`).");

    const time = ms(duration);
    if (!time) return message.reply("⚠️ Invalid time format. Use `s`, `m`, `h`, or `d`.");

    const role = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!role) return message.reply("⚠️ No 'Muted' role found. Please create one.");

    await member.roles.add(role);

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle("🔇 Member Muted")
      .setDescription(`**${user.tag}** has been muted for **${duration}** by **${message.author.tag}**`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });

    setTimeout(async () => {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        message.channel.send(`✅ **${user.tag}** has been automatically unmuted.`);
      }
    }, time);
  },
};
