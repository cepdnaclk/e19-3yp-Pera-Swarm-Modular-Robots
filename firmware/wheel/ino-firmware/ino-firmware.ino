#include <TinyWireS.h>

void setup()
{
    setup_i2c();
    setup_motor();
}

void loop()
{
    // TinyWireS_stop_check();
    motorTest();
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
      forward(255);
      break;
    case '2':
      backward(255);
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

void motorTest(){
  for(int i=0; i<=255; i+=1){
    forward(i);
    delay(20);
  }
  for(int i=255; i>=0; i-=1){
    forward(i);
    delay(20);
  }
  delay(500);
  for(int i=0; i<=255; i+=1){
    backward(i);
    delay(20);
  }
  for(int i=255; i>=0; i-=1){
    backward(i);
    delay(20);
  }
}