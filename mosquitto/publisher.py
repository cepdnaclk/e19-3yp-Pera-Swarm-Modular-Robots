import paho.mqtt.client as mqtt
import time

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

client = mqtt.Client()
client.on_connect = on_connect

client.connect("localhost", 1883, 60)  # Connect to the local broker

try:
    while True:
        client.publish("hello_topic", "hello")
        time.sleep(5)  # Publish every 5 seconds

except KeyboardInterrupt:
    print("Interrupted")
    client.disconnect()

