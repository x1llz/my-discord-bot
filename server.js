const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (_, res) => {
  res.send("✅ Hellz Bot is alive and running smoothly.");
});

app.listen(PORT, () => {
  console.log(`🌐 Express web server online — Port ${PORT}`);
});
