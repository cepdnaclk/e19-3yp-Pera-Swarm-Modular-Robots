import smbus

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


        
