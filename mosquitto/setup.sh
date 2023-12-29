#!/bin/bash

cp local.conf /etc/mosquitto/conf.d/

systemctl restart mosquitto.service
