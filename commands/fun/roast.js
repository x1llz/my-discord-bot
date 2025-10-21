import { EmbedBuilder } from "discord.js";

export default {
  name: "roast",
  description: "Roast someone hard 🔥",
  execute(message) {
    const target =
      message.mentions.users.first()?.username ||
      message.content.split(" ").slice(1).join(" ") ||
      "that goofy user";

    const roasts = [
      `Yo ${target}, u look like u still bufferin' in real life 💀`,
      `${target}, you be lookin’ like a Wi-Fi signal in a cave 📡`,
      `${target}, your drip expired back in 2016 💧😂`,
      `Damn ${target}, even ChatGPT couldn’t fix your personality 🤖`,
      `${target}, u got the confidence of a loading screen 😭`,
      `Bro ${target}, you so dry you make Discord TOS look fun 📜`,
      `Yo ${target}, your jokes so cold, they caused climate change 🥶`,
      `${target}, you built like a mobile game ad 😭📱`,
      `${target}, you the reason YouTube added “Skip Ad” 💀`,
      `Bruh ${target}, even your shadow left you 💀`,
      `${target}, u look like the “before” pic in every ad ever 😭`,
      `${target}, your rizz expired with Internet Explorer 💀`,
      `Damn ${target}, u so broke your CashApp declined a friend request 💸`,
      `Yo ${target}, you dress like you lost a bet 🧢`,
      `${target}, u sound like an off-brand Discord bot 🧠`,
      `${target}, your vibe screams “beta version” 💀`,
      `Bro ${target}, even AI said “nah” to your personality 💀`,
      `${target}, your fashion sense on Windows 95 level 🧥`,
      `Damn ${target}, you so slow your brain need an update 🔄`,
      `${target}, you be in the dictionary under “NPC” 📚`,
      `Yo ${target}, your life a low-budget edit 💀`,
      `${target}, even your mirror tryna ghost you 🪞💀`,
      `Bro ${target}, you built like a tutorial level 😭`,
      `${target}, if ugly was a crime you’d be serving life 🔒`,
      `Yo ${target}, your energy lower than your K/D ratio 🎮`,
      `${target}, you so fake Barbie called — she want her plastic back 💅`,
      `Damn ${target}, you the type to lose in a single-player game 💀`,
      `${target}, u look like u download RAM 💀💻`,
      `Bro ${target}, your drip so bad it’s causing droughts 💧`,
      `Yo ${target}, even NPCs got more dialogue than you 😭`,
      `${target}, your whole aura runs on Windows XP 💀`,
      `Damn ${target}, u look like a Roblox default with Wi-Fi lag 😭`,
      `${target}, even your Google searches gave up 🥴`,
      `Yo ${target}, you built like a pop-up ad 🚫`,
      `${target}, you so broke Monopoly won’t even let you play 💸`,
      `${target}, you a whole skill issue 💀`,
      `${target}, you look like a TikTok filter gone wrong 📱`,
      `Bro ${target}, u the reason Discord added report buttons 🛑`,
      `${target}, you the background character in your own story 😭`,
      `Damn ${target}, your face be buffering in 144p 💀`,
      `${target}, you look like the Wi-Fi password nobody remembers 📶`,
      `Bro ${target}, your hairline downloaded the wrong update 💀`,
      `${target}, even your mom muted your notifications 😭`,
      `Yo ${target}, your IQ still loading... please wait ⏳`,
      `${target}, you built like a lag spike in real life ⚡`,
      `Damn ${target}, you got less drip than a dry sponge 🧽`,
      `Bro ${target}, your whole life a 404 error 💀`,
      `${target}, your rizz got hit with a critical failure 💔`,
      `Yo ${target}, you the type to lose in rock-paper-scissors with Siri 🤖`,
      `${target}, you got roasted so bad the fire department showed up 🚒🔥`
    ];

    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    const embed = new EmbedBuilder()
      .setColor("#e74c3c")
      .setTitle("🔥 Roast Time 🔥")
      .setDescription(roast)
      .setFooter({ text: "Made by X1LLZ 💻 | discord.gg/hellz" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};