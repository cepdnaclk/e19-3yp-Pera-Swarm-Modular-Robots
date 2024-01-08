if [ $# -eq 0 ]; then                                                                               
  echo "Usage: $0 <filename>"                                                                       
  exit 1                                                                                            
fi                                                                                                  
                                                                                                     
FILENAME=$1

avr-gcc -Os -DF_CPU=8000000 -mmcu=attiny85 -c $FILENAME.c
avr-gcc -DF_CPU=8000000 -mmcu=attiny85 -o $FILENAME.elf $FILENAME.o
avr-objcopy -O ihex $FILENAME.elf $FILENAME.hex
avrdude -c stk500v1 -p attiny85 -P /dev/ttyUSB0 -b 19200 -U flash:w:$FILENAME.hex
