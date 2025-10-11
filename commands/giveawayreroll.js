module.exports = {
  name: "giveawayreroll",
  description: "Reroll the giveaway winner.",
  async execute(message, args) {
    const id = args[0];
    if (!id) return message.reply("Please provide a giveaway ID.");
    message.reply(`🔁 Giveaway **${id}** rerolled! (placeholder)`);
  },
};
