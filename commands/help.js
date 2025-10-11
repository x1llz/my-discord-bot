const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  description: "Show all available commands 💡",

  async execute(message) {
    const baseDir = path.join(__dirname, "..");
    const categories = {};

    // Fonction récursive qui lit les sous-dossiers et trie les commandes
    const loadCommands = (dir, category = "Misc") => {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
          // Nom de catégorie = nom du dossier
          const catName = path.basename(filePath);
          loadCommands(filePath, catName);
        } else if (file.endsWith(".js")) {
          delete require.cache[require.resolve(filePath)];
          const command = require(filePath);

          if (command.name && command.description) {
            if (!categories[category]) categories[category] = [];
            categories[category].push(command);
          }
        }
      }
    };

    loadCommands(baseDir);

    // Emojis pour les catégories
    const categoryEmojis = {
      fun: "🎮",
      moderation: "🛠️",
      utility: "⚙️",
      general: "🌸",
      music: "🎵",
      info: "📚",
      giveaways: "🎁",
      owner: "👑",
      misc: "✨",
    };

    // Construction de l’embed principal
    const embed = new EmbedBuilder()
      .setColor("#ff0066")
      .setTitle("💫 Hellz Command Center 💫")
      .setDescription(
        `Hey **${message.author.username}**, here’s everything I can do for you right now:\n\n`
      )
      .setFooter({
        text: "Made by X1LLZ 💻 | Hellz Bot",
        iconURL: message.client.user.displayAvatarURL(),
      })
      .setTimestamp();

    // Ajoute une section par catégorie
    for (const [category, cmds] of Object.entries(categories)) {
      const emoji =
        categoryEmojis[category.toLowerCase()] || categoryEmojis.misc;
      const formattedCommands = cmds
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => `> **+${cmd.name}** — ${cmd.description}`)
        .join("\n");

      embed.addFields({
        name: `${emoji} ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        value: formattedCommands || "*(no commands yet)*",
      });
    }

    // Total des commandes
    const total = Object.values(categories).flat().length;
    embed.addFields(
      { name: "✨ Prefix", value: "`+`", inline: true },
      { name: "🧠 Total Commands", value: `${total}`, inline: true }
    );

    await message.channel.send({ embeds: [embed] });
  },
};
