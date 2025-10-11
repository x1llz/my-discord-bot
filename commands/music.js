module.exports = {
  name: "music",
  description: "Play a song from YouTube or Spotify.",
  async execute(message, args) {
    const link = args[0];
    if (!link) return message.reply("Please provide a YouTube/Spotify link.");

    message.reply(`🎶 Playing music from: ${link} (music system not fully integrated yet).`);
  },
};
