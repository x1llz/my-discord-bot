// commands/fun/rizz.js
export default {
  name: "rizz",
  description: "Drop a smooth rizz line 😎",
  async execute(client, message) {
    const user = `<@${message.author.id}>`;

    const rizzLines = [
      `Yo ${user}, are you French? 'Cause Eiffel for you 🇫🇷💘`,
      `${user}, you got Wi-Fi? 'Cause I’m feeling a real connection 📶❤️`,
      `Girl, if looks could kill, I’d be six feet under 👀⚰️`,
      `You're so fine, Discord had to add slowmode to stop the spam 😳`,
      `Are you a keyboard? 'Cause you’re my type 🖤`,
      `You must be a magician, ${user}, 'cause every time I look at you, everyone else disappears ✨`,
      `They say nothing’s perfect — clearly they haven’t met you 💫`,
      `Are you from Minecraft? 'Cause you’re a real block of diamond 💎`,
      `Your vibe’s like lo-fi music… smooth, calm, and makes my heart beat 💓`,
      `Yo ${user}, you a parking ticket? 'Cause you got FINE written all over you 🚗💋`,
      `You must be the reason Discord has a heart emoji 💖`,
      `You dropped something… my jaw 😳`,
      `You’re like my favorite playlist — can’t get you outta my head 🎧`,
      `Are you a star? 'Cause your beauty lights up my world 🌟`,
      `If beauty was time, you’d be eternity ⏳💘`,
      `You’re so hot even my CPU can’t handle you 🔥`,
      `Yo ${user}, you a YouTube ad? 'Cause you got me stuck for 5 seconds 😭`,
      `Your name must be Google — 'cause you got everything I’m searching for 💻💞`,
      `I’m not a photographer, but I can picture us together 📸`,
      `You got a map? I keep getting lost in your DMs 🗺️💬`,
      `Even AI can’t generate someone like you 🤖❤️`,
      `You’re the Wi-Fi to my heart — connection strong and infinite 💘`,
      `You remind me of my favorite command… /love 💬`,
      `Yo ${user}, even my bot lagged when I saw you 😍`,
      `You're the update I didn’t know I needed 💾💖`,
      `Is your name Discord Nitro? 'Cause you make everything better 💎`,
      `I was gonna drop a line, but you already left me speechless 😶`,
      `You must be an admin, 'cause you got all the control 😏`,
      `You got more drip than my entire emoji pack 💧`,
      `You're like my favorite song — I play you on repeat 🎵`,
      `Even ChatGPT can’t cook rizz this smooth 💬🔥`,
      `You’re the ‘ping’ to my ‘pong’ 💌`,
      `Yo ${user}, are you sugar? 'Cause you're making my life sweeter 🍭`,
      `You must be a spell, 'cause I’m enchanted ✨`,
      `Even error 404 couldn’t stop me from finding you 😌`,
      `You look like a rare drop 💎💎`,
      `You’re the highlight of every message log 💬💘`,
      `You so bright, I need sunglasses 😎`,
      `Are you gravity? 'Cause you got me falling 💞`,
      `Your aura got better stats than my whole setup ⚡`
    ];

    const randomLine = rizzLines[Math.floor(Math.random() * rizzLines.length)];
    await message.reply(randomLine);
  }
};