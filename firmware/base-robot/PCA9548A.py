import smbus
import time


# Define I2C slave address
I2C_SLAVE_ADDRESS = 0x01

# Define I2C register map
COMMAND_REGISTER = 0x00
SPEED_REGISTER = 0x01



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

    # def setup_i2c():
    #     # Initialize I2C communication
    #     self.bus.write_byte(I2C_SLAVE_ADDRESS, 0)
    #     time.sleep(0.1)

    def execute_command(command, speed):
        # Send command and speed to the I2C device
        bus.write_i2c_block_data(I2C_SLAVE_ADDRESS, COMMAND_REGISTER, [command, speed])
        time.sleep(0.1)

if __name__ == "__main__":
    PCA9548A_module = PCA9548A()
    PCA9548A_module.scan()
    PCA9548A_module.select_channel(2)

    PCA9548A_module.bus.write_byte(0)
    PCA9548A_module.bus.write_byte(1)
    PCA9548A_module.bus.write_byte(255)
    # execute_command(1, 250)
    time.sleep(5)  # Add delay or other logic as needed

    PCA9548A_module.bus.write_byte(0)
    PCA9548A_module.bus.write_byte(3)
    # PCA9548A_module.bus.write_byte(255)