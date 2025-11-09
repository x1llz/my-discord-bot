const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const rizzLines = [
  "Are you French? Because *Eiffel* for you.",
  "You must be tired, because you’ve been running through my mind all day.",
  "Are you WiFi? Because I’m feeling a connection.",
  "Are you a keyboard? Because you’re just my type.",
  "If beauty were time, you’d be eternity.",
  "I was blinded by your beauty... I’m going to need your name and number for insurance reasons.",
  "You’re like a dictionary — you add meaning to my life.",
  "Do you have a map? Because I just got lost in your eyes.",
  "Even Google doesn’t have what I’ve been searching for.",
  "If kisses were snowflakes, I’d send you a blizzard.",
  "You’re so hot, you made my Discord crash.",
  "Are you a magician? Every time I look at you, everyone else disappears.",
  "You must be made of copper and tellurium — because you’re Cu-Te.",
  "Your hand looks heavy. Can I hold it for you?",
  "If you were a vegetable, you’d be a *cute-cumber*.",
  "Are you lightning? Because you just struck my heart.",
  "You must be an angel, because your presence is heavenly.",
  "Even the sun gets jealous of how bright you shine.",
  "Do you believe in love at first sight, or should I walk by again?",
  "You’re like my favorite song — I can’t get you out of my head.",
  "You remind me of my homework — I can’t stop thinking about you.",
  "You must be a bank loan — because you’ve got my interest.",
  "I must be a snowflake, because I’ve fallen for you.",
  "Are you a camera? Because every time I look at you, I smile.",
  "You’re the reason NPCs stop walking in Roblox.",
  "If you were a star, you’d outshine the whole galaxy.",
  "Even Discord Nitro can’t boost my heart like you do.",
  "You’re like my favorite command — I can’t stop using you.",
  "You’re not an admin, but you have full control over me.",
  "You must be JavaScript, because you’re making my heart callback."
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rizz")
    .setDescription("Send a random rizz line to someone.")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("User to rizz up")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const rizz = rizzLines[Math.floor(Math.random() * rizzLines.length)];

    const embed = new EmbedBuilder()
      .setColor("#FF69B4")
      .setTitle("💞 Rizz Activated")
      .setDescription(`**${interaction.user.username} → ${user.username}**\n> ${rizz}`)
      .setFooter({ text: "powered by Hellz" });

    await interaction.reply({ embeds: [embed] });
  },
};
