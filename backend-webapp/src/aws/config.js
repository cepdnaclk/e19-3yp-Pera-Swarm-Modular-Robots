const awsIot = require('aws-iot-device-sdk');

const device = awsIot.thingShadow({
  keyPath: './private.pem.key',
  certPath: './certificate.pem.crt',
  caPath: './AmazonRootCA1.pem',
  host: 'a30e34y7s9413e-ats.iot.ap-southeast-1.amazonaws.com',
  clientId: 'express-backend',
  region: 'ap-southeast-1',
});

device.on('connect', () => {
    console.log('Connected to IoT Core')
});

device
  .on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
});


module.exports = { device };


