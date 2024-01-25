/*
 * Firmware for Wheel Attachment of SCARA
 * Version 1
 * M. S. Peeris <e19275@eng.pdn.ac.lk>
 */

#include <TinyWireS.h> // https://github.com/nadavmatalon/TinyWireS

#define FIRMWARE_VERSION '1'

// Signals control loop to execute pending command received from master
volatile boolean isCommandPending = false;

void setup()
{
    setupI2C();
    setupMotor();
}

void loop()
{
  // Run pending commands
  if (isCommandPending) {
    executeCommand();
    isCommandPending = false;
  }

  /*
     This is the only way we can detect stop condition (http://www.avrfreaks.net/index.php?name=PNphpBB2&file=viewtopic&p=984716&sid=82e9dc7299a8243b86cf7969dd41b5b5#984716)
     it needs to be called in a very tight loop in order not to miss any (REMINDER: Do *not* use delay() anywhere, use tws_delay() instead).
     It will call the function registered via TinyWireS.onReceive(); if there is data in the buffer on stop.
  */
  TinyWireS_stop_check();
}

/* -------------------- I2C -------------------- */

#define I2C_SLAVE_ADDRESS 0x01

/*
 * I2C Register Map:
 * 
 * 0x00 - Command
 * 0x01 - Speed Value
 */

const byte regSize = 2;
volatile uint8_t i2cRegs[regSize];
volatile byte regPosition;

void setupI2C(){
  TinyWireS.begin(I2C_SLAVE_ADDRESS);
  TinyWireS.onRequest(onRequest);
  TinyWireS.onReceive(onReceive);
}

/*
   I2C data send handler

   This is called for each read request we receive, never put more than one byte of data (with TinyWireS.send) to the
   send-buffer when using this callback
*/
void onRequest(){
  //Send the value on the current register position
  TinyWireS.send(i2cRegs[regPosition]);
    
  // Increment the reg position on each read, and loop back to zero
  regPosition++;
  if (regPosition >= regSize){
      regPosition = 0;
  }
}

/*
   I2C data receive handler

   This needs to complete before the next incoming transaction (start, data, restart/stop) on the bus does
   so be quick, set flags for long running tasks to be called from the mainloop instead of running them directly,
*/
void onReceive(uint8_t howMany){
  if (howMany < 1) {
        return; // Sanity-check
  }

  regPosition = TinyWireS.receive();
  howMany--;
  
  if (!howMany){
        return; // This write was only to set the buffer for next read
  }
    
  while(howMany--)
  {
    //Store the recieved data in the currently selected register
    i2cRegs[regPosition] = TinyWireS.receive();
        
    //Proceed to the next register
    regPosition++;
    if (regPosition >= regSize){
          regPosition = 0;
    }
  }
  
  isCommandPending = true;
}

void executeCommand() {
  switch (i2cRegs[0x00]) {
    case 1:
      rotateCW(i2cRegs[0x01]);
      break;
    case 2:
      rotateCCW(i2cRegs[0x01]);
      break;
    case 3:
      stop();
      break;
  }
}

/* -------------------- Motor -------------------- */

// ATtiny85 --> L9110
// PB1      --> 1B
// PB4      --> 1A

// L9110    --> Motor
// OA       --> + (Clockwise)
// OB       --> - (Counter Clockwise)

// NOTE: Clockwise is defined when the wheel is facing towards you

#define MOTOR_CW_PIN PB4
#define MOTOR_CCW_PIN PB1

void setupMotor(){
  pinMode(MOTOR_CW_PIN, OUTPUT);
  pinMode(MOTOR_CCW_PIN, OUTPUT);

  // Disable control pins on startup
  stop();
}

void rotateCW(byte speed){
  analogWrite(MOTOR_CW_PIN, speed);
  analogWrite(MOTOR_CCW_PIN, 0);
}

void rotateCCW(byte speed){
  analogWrite(MOTOR_CW_PIN, 0);
  analogWrite(MOTOR_CCW_PIN, speed);
}

void stop(){
  analogWrite(MOTOR_CW_PIN, 0);
  analogWrite(MOTOR_CCW_PIN, 0);
}

/* Test PWM output on motor control pins */
void motorTest(){
  const int delayDuration = 5;
  const int stepSize = 10;
  for(int i=0; i<=255; i+=stepSize){
    rotateCW(i);
    delay(delayDuration);
  }
  for(int i=255; i>=0; i-=stepSize){
    rotateCW(i);
    delay(delayDuration);
  }
  for(int i=0; i<=255; i+=stepSize){
    rotateCCW(i);
    delay(delayDuration);
  }
  for(int i=255; i>=0; i-=stepSize){
    rotateCCW(i);
    delay(delayDuration);
  }
}