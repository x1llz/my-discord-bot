const { SlashCommandBuilder } = require("discord.js");

const roasts = [
  "Nigga ur fat, this is why you ain’t got money.",
  "Motherf***er your mom didn’t even give you a penny.",
  "You look like the type of person to lose a fight with your own shadow.",
  "Bro, your personality expired in 2019.",
  "You’re proof that Wi-Fi signals don’t reach common sense.",
  "Your brain called, it wants a refund.",
  "You look like you smell like expired milk.",
  "You’re the human version of a lag spike.",
  "You type like you just learned what a keyboard is.",
  "Bro got humbled by the tutorial boss.",
  "You're like a participation trophy with Wi-Fi.",
  "Your parents muted you in real life.",
  "You're built like a failed TikTok trend.",
  "You got dropped as a baby and bounced twice.",
  "You got rejected by an NPC.",
  "You're the reason autocorrect gave up.",
  "You're not dumb, you're just committed to being wrong.",
  "Bro’s confidence is built on Minecraft dirt.",
  "Your drip is powered by poverty.",
  "You argue with bots and lose."
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roast")
    .setDescription("Roast someone brutally.")
    .addUserOption(opt =>
      opt.setName("target").setDescription("The user to roast").setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const random = roasts[Math.floor(Math.random() * roasts.length)];
    await interaction.reply(`🔥 <@${target.id}>, ${random}`);
  },
};