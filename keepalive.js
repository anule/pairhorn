const http = require('http');

module.exports = function() {
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    console.log("staying alive");
  }, 270000);
}