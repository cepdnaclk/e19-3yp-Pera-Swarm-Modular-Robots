import configparser
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    client.subscribe("hello_topic")

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

config = configparser.ConfigParser()
config.read_file(open(r'settings.cfg'))
hostname = config.get('MQTT BROKER', 'hostname')
port = int(config.get('MQTT BROKER', 'port'))

client.connect(hostname, port, 60)

client.loop_forever()
