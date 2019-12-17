from pyardrone import ARDrone,at
from contextlib import suppress
import matplotlib.pyplot as plt

"""
# you should install tkinter
$ sudo apt install python3-tk
"""

drone=ARDrone()
drone.navdata_ready.wait()
# drone.send(at.CONFIG('general:navdata_demo', True))
drone.send(at.CONFIG('general:navdata_demo', False))

data = {
    "phi": [],
    "psi": [],
    "theta": [],
}

#drone.takeoff()

while True:
#    print(drone.navdata.demo.theta, drone.navdata.demo.psi, drone.navdata.demo.psi)
    print(drone.navdata)
    data["phi"].append(drone.navdata.demo.phi)
    data["psi"].append(drone.navdata.demo.psi)
    data["theta"].append(drone.navdata.demo.theta)
    plt.plot(data['phi'], color="blue")
    plt.plot(data['psi'], color="red")
    plt.plot(data['theta'], color="green")
#    plt.show()
    plt.pause(0.01)
#    data.phi.append(drone.navdata.)
#    print(drone.state)
#    plt.plot()
#drone.close()

