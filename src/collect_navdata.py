from pyardrone import ARDrone,at
from contextlib import suppress


drone=ARDrone()

def main():
    drone.navdata_ready.wait()
    drone.send(at.CONFIG('general:navdata_demo',True))
#    drone.send(at.CONFIG('general:navdata_raw_measures',True))
    with suppress(KeyboardInterrupt):
        while True:
            print(drone.state)
            print(drone.navdata)
    drone.close()

if __name__ == '__main__':
    main()

