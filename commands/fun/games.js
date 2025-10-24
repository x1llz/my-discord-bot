const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("games")
    .setDescription("Play fun games or get random facts.")
    .addSubcommand(sub => sub.setName("coinflip").setDescription("Flip a coin."))
    .addSubcommand(sub => sub.setName("rps").setDescription("Play rock-paper-scissors."))
    .addSubcommand(sub => sub.setName("8ball").setDescription("Ask the magic 8ball a question.")
      .addStringOption(opt => opt.setName("question").setDescription("Your question").setRequired(true)))
    .addSubcommand(sub => sub.setName("meme").setDescription("Get a random meme."))
    .addSubcommand(sub => sub.setName("roast").setDescription("Get roasted."))
    .addSubcommand(sub => sub.setName("rate").setDescription("Rate someone or something.")
      .addStringOption(opt => opt.setName("target").setDescription("What to rate").setRequired(true)))
    .addSubcommand(sub => sub.setName("lovecalc").setDescription("Check love compatibility between two people.")
      .addStringOption(opt => opt.setName("person1").setDescription("First name").setRequired(true))
      .addStringOption(opt => opt.setName("person2").setDescription("Second name").setRequired(true)))
    .addSubcommand(sub => sub.setName("dadjoke").setDescription("Get a random dad joke."))
    .addSubcommand(sub => sub.setName("rizz").setDescription("Get a random pickup line."))
    .addSubcommand(sub => sub.setName("spacefact").setDescription("Get a random space fact."))
    .addSubcommand(sub => sub.setName("animalfact").setDescription("Get a random animal fact."))
    .setDMPermission(true),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    // === /games coinflip ===
    if (sub === "coinflip") {
      const result = Math.random() < 0.5 ? "Heads 🪙" : "Tails 🪙";
      return interaction.reply({ content: `🌀 You flipped: **${result}**` });
    }

    // === /games rps ===
    if (sub === "rps") {
      const choices = ["🪨 Rock", "📄 Paper", "✂️ Scissors"];
      const botChoice = choices[Math.floor(Math.random() * choices.length)];
      return interaction.reply({ content: `🤖 I choose **${botChoice}**!` });
    }

    // === /games 8ball ===
    if (sub === "8ball") {
      const responses = [
        "Yes.", "No.", "Maybe.", "Definitely.", "Ask again later.",
        "Without a doubt.", "Never.", "You already know.", "It’s uncertain."
      ];
      const answer = responses[Math.floor(Math.random() * responses.length)];
      const question = interaction.options.getString("question");
      return interaction.reply({ content: `🎱 **Question:** ${question}\n**Answer:** ${answer}` });
    }

    // === /games meme ===
    if (sub === "meme") {
      const res = await fetch("https://meme-api.com/gimme");
      const data = await res.json();
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(data.title)
        .setImage(data.url)
        .setFooter({ text: `From r/${data.subreddit}` });
      return interaction.reply({ embeds: [embed] });
    }

    // === /games roast ===
    if (sub === "roast") {
      const roasts = [
        "You're proof that even evolution takes breaks.",
        "You bring everyone so much joy… when you leave the room.",
        "I'd agree with you, but then we’d both be wrong.",
        "You have something on your chin… no, the third one down.",
      ];
      const roast = roasts[Math.floor(Math.random() * roasts.length)];
      return interaction.reply({ content: `🔥 ${roast}` });
    }

    // === /games rate ===
    if (sub === "rate") {
      const target = interaction.options.getString("target");
      const rating = Math.floor(Math.random() * 101);
      return interaction.reply({ content: `⭐ I rate **${target}** ${rating}/100` });
    }

    // === /games lovecalc ===
    if (sub === "lovecalc") {
      const p1 = interaction.options.getString("person1");
      const p2 = interaction.options.getString("person2");
      const love = Math.floor(Math.random() * 101);
      const embed = new EmbedBuilder()
        .setColor("Pink")
        .setTitle("❤️ Love Compatibility")
        .setDescription(`${p1} ❤️ ${p2}\nCompatibility: **${love}%**`);
      return interaction.reply({ embeds: [embed] });
    }

    // === /games dadjoke ===
    if (sub === "dadjoke") {
      const res = await fetch("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
      const data = await res.json();
      return interaction.reply({ content: `😂 ${data.joke}` });
    }

    // === /games rizz ===
    if (sub === "rizz") {
      const lines = [
        "Are you French? Because Eiffel for you.",
        "You must be Wi-Fi, because I'm feeling a connection.",
        "You’re like a fine wine, you just keep getting better.",
        "I’m not a photographer, but I can picture us together.",
      ];
      const rizz = lines[Math.floor(Math.random() * lines.length)];
      return interaction.reply({ content: `💬 ${rizz}` });
    }

    // === /games spacefact ===
    if (sub === "spacefact") {
      const facts = [
        "Venus rotates in the opposite direction to most planets.",
        "A day on Venus is longer than a year on Venus.",
        "There are more stars in space than grains of sand on Earth.",
        "Neutron stars can spin 600 times per second.",
      ];
      const fact = facts[Math.floor(Math.random() * facts.length)];
      return interaction.reply({ content: `🌌 ${fact}` });
    }

    // === /games animalfact ===
    if (sub === "animalfact") {
      const facts = [
        "Sloths can hold their breath longer than dolphins can.",
        "Octopuses have three hearts and blue blood.",
        "Cows have best friends and get stressed when separated.",
        "Sea otters hold hands while sleeping to keep from drifting apart.",
      ];
      const fact = facts[Math.floor(Math.random() * facts.length)];
      return interaction.reply({ content: `🐾 ${fact}` });
    }
  },
};