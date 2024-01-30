var counter = 0;
exports.getLiveData = async (req, res) => {
    try {
  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  counter = 0;

  const {client} = require('../mqtt/client');

  const console_topic = "live_data";
  const battery_topic = "battery";
  client.subscribe(console_topic);
  client.subscribe(battery_topic);
  client.on("message", (receivedTopic, message) => {
    if (receivedTopic === console_topic) {
        data = {
            consoleText: message.toString(),
            batteryLevel: null,
        }
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
    if (receivedTopic === battery_topic) {
        data = {
            consoleText: null,
            batteryLevel: message.toString(),
        }
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  });
/*
    setInterval(() => {
        data = {
            armAngle: getArmPosition(),
            robotSpeed: getRobotSpeed(),
            distanceToObject: getDistanceToObject(counter),
            consoleText: getConsoleText()
        }

        res.write(`data: ${JSON.stringify(data)}\n\n`);


    }, 1000);
*/  
    // Handle connection closure
    req.on('close', () => {
      // Cleanup when the client disconnects
      console.log('Live Client disconnected');
    });
        

    } catch (error) {
        res.status(500).send('Something is Wrong with backend');
    }
};

function getArmPosition() {
    // TODO: Implement logic to get arm position
    return Math.floor(Math.random() * (90 - (-90) + 1) + (-90));
}

function getRobotSpeed() {
    // TODO: Implement logic to get robot speed
    return Math.floor(Math.random() * (100 - (0) + 1) + (0));
}

function getDistanceToObject() {
    // TODO: Implement logic to get distance to the object
    const xVal = ++counter;
    const yVal = Math.floor(Math.random() * 100) + 1;
    return { xVal, yVal };
}


function getConsoleText() {
    // TODO: Implement logic to get text
    return 'Text data';
}

