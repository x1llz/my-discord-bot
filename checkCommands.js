const fs = require("fs");

const allNames = new Map();

function scan(dir = "./commands") {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const path = `${dir}/${file}`;
    if (fs.statSync(path).isDirectory()) {
      scan(path);
    } else if (file.endsWith(".js")) {
      const content = fs.readFileSync(path, "utf8");
      const match = content.match(/\.setName\(["'`](.*?)["'`]\)/);
      if (match) {
        const name = match[1];
        if (!/^[a-z0-9_-]+$/.test(name)) {
          console.log(`❌ Invalid name in ${path} -> "${name}"`);
        }
        if (allNames.has(name)) {
          console.log(`⚠️ Duplicate name: "${name}" in ${path} and ${allNames.get(name)}`);
        } else {
          allNames.set(name, path);
        }
      }
    }
  }
}

scan();
console.log("✅ Command name check complete.");