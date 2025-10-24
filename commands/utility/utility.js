const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("utility")
    .setDescription("General utility tools.")
    .addSubcommand(sub =>
      sub
        .setName("define")
        .setDescription("Get the definition of a word.")
        .addStringOption(opt =>
          opt.setName("word").setDescription("Word to define.").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("poll")
        .setDescription("Create a poll.")
        .addStringOption(opt =>
          opt.setName("question").setDescription("Poll question.").setRequired(true)
        )
        .addStringOption(opt =>
          opt.setName("option1").setDescription("First option").setRequired(true)
        )
        .addStringOption(opt =>
          opt.setName("option2").setDescription("Second option").setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("remind")
        .setDescription("Set a reminder.")
        .addStringOption(opt =>
          opt.setName("time").setDescription("Time (e.g., 10m, 2h)").setRequired(true)
        )
        .addStringOption(opt =>
          opt.setName("message").setDescription("Reminder message").setRequired(true)
        )
    )
    .setDMPermission(true),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    // === /utility define ===
    if (sub === "define") {
      const word = interaction.options.getString("word");
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        if (!Array.isArray(data) || !data[0]) {
          return interaction.reply({
            content: `❌ No definition found for **${word}**.`,
            ephemeral: true,
          });
        }

        const meaning = data[0].meanings[0];
        const embed = new EmbedBuilder()
          .setColor("Aqua")
          .setTitle(`📘 Definition of "${word}"`)
          .addFields(
            { name: "Part of speech", value: meaning.partOfSpeech || "Unknown" },
            {
              name: "Meaning",
              value: meaning.definitions[0].definition || "No definition found.",
            }
          )
          .setFooter({ text: "DictionaryAPI.dev" })
          .setTimestamp();

        return interaction.reply({ embeds: [embed], ephemeral: true });
      } catch (err) {
        console.error(err);
        return interaction.reply({
          content: "⚠️ Failed to fetch the definition.",
          ephemeral: true,
        });
      }
    }

    // === /utility poll ===
    if (sub === "poll") {
      const question = interaction.options.getString("question");
      const option1 = interaction.options.getString("option1");
      const option2 = interaction.options.getString("option2");

      const embed = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("📊 Poll")
        .setDescription(question)
        .addFields(
          { name: "🅰️ Option 1", value: option1 },
          { name: "🅱️ Option 2", value: option2 }
        )
        .setFooter({ text: `Poll by ${interaction.user.tag}` })
        .setTimestamp();

      const pollMsg = await interaction.reply({ embeds: [embed], fetchReply: true });
      await pollMsg.react("🅰️");
      await pollMsg.react("🅱️");
      return;
    }

    // === /utility remind ===
    if (sub === "remind") {
      const timeStr = interaction.options.getString("time");
      const message = interaction.options.getString("message");

      const ms = parseTime(timeStr);
      if (!ms)
        return interaction.reply({
          content: "❌ Invalid time format. Use something like `10m`, `2h`, `1d`.",
          ephemeral: true,
        });

      await interaction.reply({
        content: `⏰ Reminder set! I’ll remind you in **${timeStr}**.`,
        ephemeral: true,
      });

      setTimeout(() => {
        interaction.user.send(`⏰ Reminder: ${message}`).catch(() => {});
      }, ms);
    }
  },
};

// Helper: convert 10m, 2h, 1d to milliseconds
function parseTime(str) {
  const match = /^(\d+)(s|m|h|d)$/i.exec(str);
  if (!match) return null;
  const num = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return num * multipliers[unit];
}