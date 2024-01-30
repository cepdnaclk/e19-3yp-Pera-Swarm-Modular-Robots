const awsIot = require('aws-iot-device-sdk');
const path = require('path');

const device = awsIot.thingShadow({
  keyPath: path.resolve(__dirname, './certs/private.pem.key'),
  certPath: path.resolve(__dirname, './certs/certificate.pem.crt'),
  caPath: path.resolve(__dirname, './certs/AmazonRootCA1.pem'),
  host: 'a30e34y7s9413e-ats.iot.ap-southeast-1.amazonaws.com',
  clientId: 'express-backend',
  region: 'ap-southeast-1',
});

device.on('connect', () => {
    console.log('Connected to IoT Core')
});

// device
//   .on('message', (topic, payload) => {
//     console.log('message', topic, payload.toString());
// });

// Function to publish a message to a certain topic
function publishToTopic(topic, message) {
  device.publish(topic, JSON.stringify(message));
}

module.exports = { device, publishToTopic };


