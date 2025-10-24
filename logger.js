const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "logs");
const logPath = path.join(logsDir, "hellz.log");

// === Create logs folder if not exists ===
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

// === Function to clean logs older than 7 days ===
function cleanOldLogs() {
  const files = fs.readdirSync(logsDir);
  const now = Date.now();

  for (const file of files) {
    const filePath = path.join(logsDir, file);
    const stats = fs.statSync(filePath);
    const ageDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

    if (ageDays > 7) fs.unlinkSync(filePath);
  }
}

// === Write logs ===
function writeLog(type, message) {
  const time = new Date().toISOString();
  const line = `[${time}] [${type.toUpperCase()}] ${message}\n`;

  fs.appendFileSync(logPath, line, "utf8");
  console.log(line.trim());
}

// === Schedule daily cleanup ===
setInterval(cleanOldLogs, 24 * 60 * 60 * 1000); // every 24h
cleanOldLogs();

module.exports = {
  info: (msg) => writeLog("INFO", msg),
  warn: (msg) => writeLog("WARN", msg),
  error: (msg) => writeLog("ERROR", msg),
  command: (msg) => writeLog("COMMAND", msg),
};