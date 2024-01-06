import smbus
import time

DEV_ADDR = 0x04

bus = smbus.SMBus(1)
reads = 0
errs = 0

while True:
    reads += 1
    try:
        a_val = bus.read_word_data(DEV_ADDR, 0)
        print("Read value [%s]; no. of reads [%s]; no. of errors [%s]" % (a_val, reads, errs))
    except Exception as ex:
        errs += 1
        print("Exception [%s]" % (ex))

    time.sleep(0.01)

