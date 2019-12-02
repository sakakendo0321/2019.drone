#git+https://github.com/fkmclane/python-ardrone

import ardrone
import datetime
from icecream import ic
import json
import signal
import time

data={
        "items":[]
}
sum = {
    'theta':0,
    'phi':0,
    'psi':0,
    'vx':0,
    'vy':0,
    'vz':0
}

def scheduler(arg1,arg2):
    data["items"].append(drone.navdata)
    ic(drone.navdata)

def main():
    signal.signal(signal.SIGALRM,scheduler)
    signal.setitimer(signal.ITIMER_REAL,1,1)
    time.sleep(10)
#    print(data)
    with open("../log/navdata{}.txt".format(datetime.datetime.now()),"w") as f:
        f.write(json.dumps(data))


if __name__ == "__main__":
    drone=ardrone.ARDrone()
    drone.at(ardrone.at.config, 'general:navdata_demo', True)
    drone.at(ardrone.at.config, 'general:navdata_metadata', True)
    drone.at(ardrone.at.config, 'general:navdata_rawmeasures', True)
    main()

