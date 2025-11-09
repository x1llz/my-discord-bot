module.exports = {
  name: "ready",
  once: true,

  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);

    const statuses = [
      "/help | .gg/hellz",
      "Moderating servers",
      "Serving the Hellz Community 💙",
    ];

    let i = 0;
    setInterval(() => {
      client.user.setPresence({
        activities: [{ name: statuses[i++ % statuses.length], type: 0 }],
        status: "online",
      });
    }, 15000); // rotates every 15s
  },
};
