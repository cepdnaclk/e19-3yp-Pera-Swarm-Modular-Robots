from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import logging
import time
import argparse
import json
from os.path import abspath
import subprocess

# Custom MQTT message callback
def customCallback(client, userdata, message):
    print("Received a new message: ")
    print(message.payload)
    print("from topic: ")
    print(message.topic)
    print("----------------------")

def serverDirectivesHandler(client, userdata, message):
    instr = str(message.payload.decode("utf-8"))
    if (instr == "run"):
        print("Downloading code")
        # subprocess.run(["python3", "get_exp.py"])
        subprocess.run(["python3", "exp/run.py"])

# Configure logging
# logger = logging.getLogger("AWSIoTPythonSDK.core")
# logger.setLevel(logging.DEBUG)
# streamHandler = logging.StreamHandler()
# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# streamHandler.setFormatter(formatter)
# logger.addHandler(streamHandler)

# Init AWSIoTMQTTClient
myAWSIoTMQTTClient = AWSIoTMQTTClient("base-robot")
myAWSIoTMQTTClient.configureEndpoint("a30e34y7s9413e-ats.iot.ap-southeast-1.amazonaws.com", 8883)
myAWSIoTMQTTClient.configureCredentials(abspath("./certs/Amazon-root-CA-1.pem"), abspath("./certs/private.pem.key"), abspath("./certs/device.pem.crt")) 

# AWSIoTMQTTClient connection configuration
# myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
# myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
# myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
# myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
# myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec

# Connect and subscribe to AWS IoT
myAWSIoTMQTTClient.connect()
myAWSIoTMQTTClient.subscribe("server_directives", 1, serverDirectivesHandler)

while (True):
    pass

