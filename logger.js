const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

function getLogPath() {
  const date = new Date().toISOString().split("T")[0];
  return path.join(logsDir, `hellz-${date}.log`);
}

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

function writeLog(type, message, colorFn) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${type}] ${message}\n`;
  fs.appendFileSync(getLogPath(), logLine, "utf8");
  console.log(colorFn(`[${type}] ${message}`));
}

setInterval(cleanOldLogs, 24 * 60 * 60 * 1000);
cleanOldLogs();

module.exports = {
  info: (msg) => writeLog("INFO", msg, chalk.cyan),
  warn: (msg) => writeLog("WARN", msg, chalk.yellow),
  error: (msg) => writeLog("ERROR", msg, chalk.red),
  command: (msg) => writeLog("COMMAND", msg, chalk.green),
};
