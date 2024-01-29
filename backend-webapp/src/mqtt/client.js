const mqtt = require("mqtt");
const client = mqtt.connect(process.env.MOSQUITTO_URL);

client.on("connect", () => {
  console.log("Connected to Mosquitto Broker");
});

function publishToTopic(topic, message) {
  client.publish(topic, message);
}

function subscribeToTopic(topic, callback) {
  client.subscribe(topic);
  client.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic) {
      callback(message.toString());
    }
  });
}



module.exports = {
  client,
  publishToTopic
};