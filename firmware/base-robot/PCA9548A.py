import smbus
import time

class PCA9548A:
    address = 0x70 # address of PCA9548A

    def __init__(self):
        # Initialize I2C on Raspberry Pi
        rp_channel = 1
        self.bus = smbus.SMBus(rp_channel)

    def select_channel(self, mux_channel):
        self.bus.write_byte(PCA9548A.address, 1 << mux_channel)

    def scan(self):
        print("Scanning available devices:")
        for mux_channel in range(8):
            self.select_channel(mux_channel)
            print(f" {mux_channel}")

            for addr in range(128):
                if (addr == PCA9548A.address):
                    continue

                try:
                    self.bus.read_byte(addr)
                    print(" --0x{:02X}".format(addr))
                except IOError:
                    pass
        print("Done")

if __name__ == "__main__":
    PCA9548A_module = PCA9548A()
    PCA9548A_module.scan()

    DEV_ADDR = 0x04
    reads = 0
    errs = 0

    while True:
        reads += 1
        try:
            PCA9548A_module.select_channel(2)
            a_val = PCA9548A_module.bus.read_word_data(DEV_ADDR, 0)
            print("Read value [%s]; no. of reads [%s]; no. of errors [%s]" % (a_val, reads, errs))
        except Exception as ex:
            errs += 1
            print("Exception [%s]" % (ex))

        time.sleep(0.01)

