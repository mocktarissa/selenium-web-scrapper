const redis = require("redis");
const client = redis.createClient();
client.on("connect", function() {
    console.log("You are now connected");
  });
module.exports = client;