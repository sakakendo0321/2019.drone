import ardrone 
from icecream import ic
import signal
import time

drone=ardrone.ARDrone()

# drone.takeoff()
# drone.land()

sum = {
    'theta':0,
    'phi':0,
    'psi':0,
    'vx':0,
    'vy':0,
    'vz':0
}

def scheduler(arg1,arg2):
    sum["theta"] += drone.navdata['demo']['theta']
    sum["phi"] += drone.navdata['demo']['phi']
    sum["psi"] += drone.navdata['demo']['psi']
    sum["vx"] += drone.navdata['demo']['vx']
    sum["vy"] += drone.navdata['demo']['vy']
    sum["vz"] += drone.navdata['demo']['vz']
    print(time.time())
    ic(sum)

#drone.image.show()

if __name__ == "__main__":
    print("start program")
    signal.signal(signal.SIGALRM,scheduler)
    signal.setitimer(signal.ITIMER_REAL,1,1)
    while True:
        pass
    drone.halt()
    print("finished")

