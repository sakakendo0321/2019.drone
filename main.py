import ardrone 
from icecream import ic
import signal
drone=ardrone.ARDrone()

# drone.takeoff()
# drone.land()

sum = {
    'theta',
    'phi',
    'psi',
    'vx',
    'vy',
    'vz',
}

def scheduler(arg1,arg2):
    sum["theta"] += drone.navdata['demo']['theta']
    sum["phi"] += drone.navdata['demo']['phi']
    sum["psi"] += drone.navdata['demo']['psi']
    sum["vx"] += drone.navdata['demo']['vx']
    sum["vy"] += drone.navdata['demo']['vy']
    sum["vz"] += drone.navdata['demo']['vz']
    ic(sum)

#drone.image.show()

if __name__ == "__main__":
    print("start program")
    signal.signal(signal.SIGARALM,scheduler)
    signal.settimer(signal.ITIMER_REAL,1,1)
    drone.halt()
    print("finished")

