from pyardrone import ARDrone, at

drone=ARDrone()
drone.navdata_ready.wait()
drone.send(at.CONFIG('general:navdata_demo', True))

print('takeoff')

drone.takeoff()

#while True:
#    print(drone.navdata)

import time
time.sleep(10)

drone.land()

