# Mosquitto Broker Setup

### Installation
For Ubuntu:
```bash
sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
sudo apt-get update
sudo apt-get install mosquitto
```
More details: https://mosquitto.org/download/

### Copy the required config file
For local development:
```bash
cp dev.conf /etc/mosquitto/conf.d/
```
For production:
```bash
cp prod.conf /etc/mosquitto/conf.d/
```
Note that mosquitto loads all .conf files in the /etc/mosquitto/conf.d directory so make sure no other .conf files that would overwrite the above files exists before copying

### Restart mosquitto
```bash
systemctl restart mosquitto.service
```

### Creating client credentials
Use the mosquitto_passwd utility:
```bash
mosquitto_passwd -c /etc/mosquitto/passwd <username>
```
Enter password when prompted and restart the service