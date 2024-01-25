const mqtt = require("mqtt");
const client = mqtt.connect(process.env.MOSQUITTO_URL);

client.on("connect", () => {
  client.subscribe("presence", (err) => {
    if (!err) {
        console.log("Connected to Mosquitto Broker");
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});