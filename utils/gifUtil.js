
const https = require("https");

function fetchGif(query, fallbacks = []) {
  return new Promise((resolve, reject) => {
    const key = process.env.TENOR_KEY || process.env.TENOR_API_KEY;
    if (!key) {
      if (fallbacks.length) return resolve(fallbacks[Math.floor(Math.random()*fallbacks.length)]);
      return reject(new Error("No TENOR_KEY and no fallbacks provided"));
    }
    const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${key}&client_key=hellz-bot&limit=20&media_filter=gif&contentfilter=high`;

    https
      .get(url, res => {
        let data = "";
        res.on("data", c => (data += c));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            const results = json?.results || [];
            if (!results.length && fallbacks.length) return resolve(fallbacks[Math.floor(Math.random()*fallbacks.length)]);
            const rand = results[Math.floor(Math.random()*results.length)];
            const gif = rand?.media_formats?.gif?.url || rand?.media_formats?.tinygif?.url;
            if (gif) return resolve(gif);
            if (fallbacks.length) return resolve(fallbacks[Math.floor(Math.random()*fallbacks.length)]);
            reject(new Error("No gif field returned"));
          } catch (e) {
            if (fallbacks.length) return resolve(fallbacks[Math.floor(Math.random()*fallbacks.length)]);
            reject(e);
          }
        });
      })
      .on("error", err => {
        if (fallbacks.length) return resolve(fallbacks[Math.floor(Math.random()*fallbacks.length)]);
        reject(err);
      });
  });
}

module.exports = { fetchGif };
