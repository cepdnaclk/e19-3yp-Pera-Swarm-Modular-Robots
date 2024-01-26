import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("hello_topic")

def on_message(client, userdata, msg):
    print("Received message: "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("18.141.58.80", 1883, 60*5)  # Connect to the local broker

try:
    client.loop_forever()  # Keep the client running to receive messages

except KeyboardInterrupt:
    print("Interrupted")
    client.disconnect()
