// commands/fun/roast.js
export default {
  name: "roast",
  description: "Send a random roast 🔥",
  async execute(client, message) {
    const target = message.mentions.users.first() || message.author;

    const roasts = [
      `Yo ${target}, you look like lag in human form 💀`,
      `${target}, you probably think “WiFi” stands for “Why Fight” 😂`,
      `Even AI gave up trying to understand you 🤖❌`,
      `You're like an update that breaks everything 💻💥`,
      `${target}, you could lose a 1v1 against a Minecraft chicken 🐔`,
      `You're so fake Barbie got jealous 🪆`,
      `If stupidity was a sport, you’d have a gold medal 🥇`,
      `You're like a bug that survived every patch 💀`,
      `Bro, even Discord bots have more personality than you 😭`,
      `You look like you still rage-quit UNO 💀`,
      `Your energy could crash a server ⚡`,
      `You’re like an NPC that forgot its dialogue halfway 💬💀`,
      `Your brain’s still buffering… please wait ⏳`,
      `You’re proof that evolution takes breaks 😭`,
      `You make Windows updates look fast 💾`,
      `Your style expired when Vine died 📉`,
      `You built like a corrupted save file 💾💀`,
      `You're the human version of a 404 error 🚫`,
      `Even my ping is lower than your IQ 🧠`,
      `You're what happens when lag meets bad WiFi 🌐💀`,
      `If cringe was a currency, you’d be a billionaire 💸`,
      `You could trip over a wireless signal 📡`,
      `Even Google can’t find your logic 🔍`,
      `You're the DLC nobody asked for 😭`,
      `You're like a meme from 2012 — dead but still here 🪦`,
      `You're the patch note that says “fixed nothing” 🧩`,
      `You're like an empty server — no one’s joining 😭`,
      `You're the reason the term “skill issue” exists 💀`,
      `Even your reflection logs out 💬`,
      `You're basically a mobile game ad 📱`,
      `You look like you skipped the tutorial and it shows 😭`,
      `If brain cells were pixels, you'd still be 144p 💻`,
      `You're a walking 0 kb file 📂`,
      `Your aim in life is like your aim in game — nonexistent 🎯`,
      `You're like an old meme — nobody laughs anymore 😭`,
      `You talk like a patch note nobody reads 🧾`,
      `Even your shadow left the chat 👻`,
      `You're built like lag incarnate 🌐`,
      `You're the NPC in a cutscene — silent and useless 💀`,
      `You're so dry the Sahara filed a copyright claim 🌵`,
      `You're like a Windows error popup — annoying and constant 💢`,
      `If stupidity was contagious, you'd be the pandemic 😭`,
      `You're a low-effort copy of your own personality 💀`,
      `You built like a Discord emoji with no server permissions 🚫`,
      `Even your autocorrect stopped trying ✍️`
    ];

    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    await message.reply(roast);
  }
};