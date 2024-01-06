#include <TinyWireS.h>

#define I2C_SLAVE_ADDRESS 0x04

byte reg[] = {0x00, 0x00};
byte reg_idx = 0;

void onRequest()
{
  TinyWireS.send(reg[reg_idx]);
  reg_idx = (reg_idx == 1) ? 0 : 1;
}

void setup()
{
    TinyWireS.begin(I2C_SLAVE_ADDRESS);
    TinyWireS.onRequest(onRequest);
}

void loop()
{
    // int a2 = analogRead(2);
    // reg[0] = lowByte(a2);
    // reg[1] = highByte(a2);
    reg[0] = 0b10101010;
    reg[1] = 0b11110000;

    TinyWireS_stop_check();
}