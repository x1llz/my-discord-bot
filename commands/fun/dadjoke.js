const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const jokes = [
  "I told my wife she should embrace her mistakes. She hugged me.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I used to play piano by ear, but now I use my hands.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What do you call fake spaghetti? An impasta.",
  "I told my doctor I broke my arm in two places. He told me to stop going to those places.",
  "Why did the math book look sad? Because it had too many problems.",
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Did you hear about the claustrophobic astronaut? He just needed a little space.",
  "Why can't your nose be 12 inches long? Because then it would be a foot.",
  "I don't trust stairs. They're always up to something.",
  "Want to hear a construction joke? Sorry, I'm still working on it.",
  "I used to hate facial hair, but then it grew on me.",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
  "I would tell you a joke about chemistry, but I know I wouldn't get a reaction.",
  "Why was the computer cold? It left its Windows open.",
  "Parallel lines have so much in common… it’s a shame they’ll never meet.",
  "What do you call cheese that isn't yours? Nacho cheese.",
  "Why did the picture go to jail? Because it was framed.",
  "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
  "I'm on a seafood diet. I see food and I eat it.",
  "What do you call a factory that makes good products? A satisfactory.",
  "Why did the coffee file a police report? It got mugged.",
  "What’s orange and sounds like a parrot? A carrot.",
  "Why did the cookie go to the hospital? Because it felt crummy.",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Send a random dad joke"),

  async execute(interaction) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    const embed = new EmbedBuilder()
      .setColor("#FFD580")
      .setTitle("👨‍🦰 Dad Joke")
      .setDescription(joke)
      .setFooter({ text: "Hellz Fun System" });

    await interaction.reply({ embeds: [embed] });
  },
};
