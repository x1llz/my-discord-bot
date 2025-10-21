const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "roast",
  description: "🔥 Roast someone brutally (for fun)",

  execute(message, args) {
    const target = message.mentions.users.first() || message.author;

    const roasts = [
      `yo ${target.username}, u look like u be in the dictionary under "basic af" 💯`,
      `${target.username}, u probably think ur username a hacker flex but nah 💀`,
      `${target.username}, you built like a 240p emoji 😂`,
      `${target.username}, u type like autocorrect gave up 😭`,
      `bruh ${target.username}, even ur Wi-Fi disconnects from embarrassment 📶`,
      `no offense ${target.username}, but u got the aura of a failed TikTok trend 💀`,
      `${target.username}, ur brain running on Windows XP 🧠💻`,
      `ayo ${target.username}, u built like a Discord bot stuck in loop 🤖`,
      `${target.username}, u be lagging in real life ⏳`,
      `${target.username}, u got that “update failed” energy 💀`,
      `${target.username}, ur outfit screams "my mom picked this" 🍼`,
      `${target.username}, even ur shadow dipped from embarrassment ☠️`,
      `u so dry ${target.username}, even the Sahara called u competition 🏜️`,
      `${target.username}, ur comebacks loading since 2018 🔄`,
      `${target.username}, ur face got patch notes every week 😭`,
      `bro ${target.username}, u couldn’t even win a staring contest with ur mirror 💀`,
      `u talk like u buffering ${target.username} 🌀`,
      `${target.username}, u look like the “before” pic in every ad 💊`,
      `ngl ${target.username}, u a background character in ur own story 📺`,
      `${target.username}, u got “free trial of personality” vibes 🧍‍♂️`,
      `${target.username}, ur drip expired last decade 💧`,
      `${target.username}, u built like a default Minecraft skin ⛏️`,
      `ur humor is so dry ${target.username}, tumbleweeds start laughing first 💀`,
      `${target.username}, u the type to lose a 1v1 against lag 💢`,
      `ur confidence got lower ping than ur Wi-Fi ${target.username} 📶`,
      `${target.username}, u be smelling like unbanned accounts 🦨`,
      `ayo ${target.username}, even ur own reflection reported u 🚫`,
      `${target.username}, ur energy = uncharged controller 🔋`,
      `${target.username}, u so slow Google gave up searching u 🔍`,
      `${target.username}, ur aim worse than stormtroopers 🎯`,
      `u got “printer offline” vibes ${target.username} 🖨️`,
      `${target.username}, ur music taste made Spotify cry 😭`,
      `yo ${target.username}, u look like u microwave cereal 🥣`,
      `if L’s were trophies, u’d be a champion ${target.username} 🏆`,
      `u got more bugs than Cyberpunk 2077 ${target.username} 💻`,
      `${target.username}, u built like a loading screen tip 💀`,
      `bruh ${target.username}, even AI can’t generate ur personality 🤖`,
      `${target.username}, u look like a side quest nobody asked for 🗺️`,
      `ngl ${target.username}, u the reason tutorials exist 📘`,
      `${target.username}, ur vibe says “insert coin to continue” 🪙`,
      `${target.username}, ur brain needs a firmware update 🧠`,
      `yo ${target.username}, u so extra u make math homework jealous 📚`,
      `${target.username}, even ur pet typing "LMAOO" rn 🐶`,
      `${target.username}, ur jokes aged like unrefrigerated milk 🥴`,
      `no cap ${target.username}, ur personality still in beta 🧪`,
      `u so mid ${target.username}, even the alphabet skipped ur letter 🔤`,
      `${target.username}, ur energy screams "read-only access" 🔒`,
      `bro ${target.username}, u the lag in every good moment 😭`,
      `${target.username}, ur aura got 404 vibes – not found 🧩`,
      `${target.username}, u the human version of a 3-day trial 💀`,
      `yo ${target.username}, stay mad, stay basic, keep being u 😭`
    ];

    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

    const embed = new EmbedBuilder()
      .setColor("#5865F2")
      .setTitle("🔥 ROAST INCOMING 🔥")
      .setDescription(randomRoast)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};