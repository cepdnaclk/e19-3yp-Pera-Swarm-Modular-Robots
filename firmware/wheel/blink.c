#include <avr/io.h>
#include <util/delay.h>

int main(){
  DDRB |= (1<<PB0);

  while(1){
    PORTB ^= (1<<PB0);
    _delay_ms(100);
  }
}
