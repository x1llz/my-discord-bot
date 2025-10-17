const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Hellz Bot is running!");
});

app.listen(PORT, () => {
  console.log(`🌐 Web server actif sur le port ${PORT}`);
});
