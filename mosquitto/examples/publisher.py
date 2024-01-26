import paho.mqtt.client as mqtt
import time

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

client = mqtt.Client()
client.on_connect = on_connect

client.connect("18.141.58.80", 1883, 60*5)  # Connect to the local broker

try:
    while True:
        client.publish("hello_topic", "hello")
        time.sleep(5)  # Publish every 5 seconds

except KeyboardInterrupt:
    print("Interrupted")
    client.disconnect()

