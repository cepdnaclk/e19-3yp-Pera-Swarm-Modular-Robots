#include <TinyWireS.h>

void setup()
{
    setup_i2c();
    setup_motor();
}

void loop()
{
    TinyWireS_stop_check();
}

/* I2C */

#define I2C_SLAVE_ADDRESS 0x04

void setup_i2c(){
  TinyWireS.begin(I2C_SLAVE_ADDRESS);
  TinyWireS.onRequest(onRequest);
  TinyWireS.onReceive(onReceive);
}

void onRequest()
{
  TinyWireS.send(1);
}

void onReceive(){
  while (TinyWireS.available()) {
  char command = TinyWireS.receive();
  executeCommand(command);
  }
}

void executeCommand(char command) {
  switch (command) {
    case '1':
      forward(128);
      break;
    case '0':
      backward(128);
      break;
  }
}

/* Motor */

#define MOTOR_PIN_A PB1
#define MOTOR_PIN_B PB4

void setup_motor(){
  pinMode(MOTOR_PIN_A, OUTPUT);
  pinMode(MOTOR_PIN_B, OUTPUT);
}

void forward(byte speed){
  analogWrite(MOTOR_PIN_A, speed);
  analogWrite(MOTOR_PIN_B, 0);
}

void backward(byte speed){
  analogWrite(MOTOR_PIN_A, 0);
  analogWrite(MOTOR_PIN_B, speed);
}