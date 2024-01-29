from config_loader import load_config
import paho.mqtt.client as mqtt
from paho.mqtt.subscribeoptions import SubscribeOptions

mqtt_username = None
experiment_process = None


def handle_run_directive(client):
    client.publish(f"{mqtt_username}/server-directives", "Downloading code")
    subprocess.run(["python3", "get_exp.py"])
    client.publish(f"{mqtt_username}/server-directives", "Running code")
    experiment_process = subprocess.Popen(["python3", "exp/run.py"])

def handle_stop_directive():
    if (experiment_process != None):
        experiment_process.kill()
        experiment_process = None

" MQTT Broker Connect Handler"
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    # username = userdata.get('username', 'test')
    options = SubscribeOptions(qos=1, noLocal=True) # prevent callback on messages you publish
    client.subscribe(f"{mqtt_username}/#", options=options)
    client.publish(f"{mqtt_username}/server-directives", "Connected to MQTT Broker")

    # start battery publisher service

" MQTT Broker Message Handler "
def on_message(client, userdata, msg):
    instr = str(msg.payload.decode("utf-8"))
    print(msg.topic + " " + str(instr))
    if (instr == "run"):
        handle_run_directive(client)
    if (instr == "stop"):
        handle_stop_directive(client)

if __name__ == "__main__":
    # Load config file
    rc, config = load_config() 
    if (rc != 0): 
        exit(rc)

    # Connect to mqtt broker
    mqtt_hostname = config['MQTT BROKER']['hostname']
    mqtt_port = int(config['MQTT BROKER']['port'])
    mqtt_username = config['MQTT BROKER']['username']
    mqtt_password = config['MQTT BROKER']['password']

    client = mqtt.Client()
    client.username_pw_set(username=mqtt_username, password=mqtt_password)

    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(mqtt_hostname, mqtt_port, 60)

    client.loop_forever()



