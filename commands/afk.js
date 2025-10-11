module.exports = {
  name: "afk",
  description: "Set your AFK status with a reason.",
  async execute(message, args, client) {
    const reason = args.join(" ").trim() || "AFK";
    client.afk.set(message.author.id, { reason, since: Date.now() });
    return message.reply(`💤 You are now AFK: **${reason}** (I'll notify when someone mentions you)`);
  },
};

