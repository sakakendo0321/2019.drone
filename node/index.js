const fs = require('fs');
const os = require('os')
const arDrone = require('ar-drone');
var express = require('express');
var app = express();
var http = require('http').Server(app);
const ioServer = require('socket.io')(http);

const drone = arDrone.createClient();
//drone.config('general:navdata_demo','FALSE')

const HOSTNAME = os.hostname()
const HOST = process.env.HOST || '192.168.20.1'
const PORT = process.env.PORT | 8000

const ioClient = require('socket.io-client');
const socketClient = ioClient.connect(HOST + PORT);

let droneState = {
  psi: 0,
  phi: 0,
  theta: 0,
  x: 0,
  y: 0,
  z: 0,
}
let lastTime = null;

app.use(express.static('./static'))

ioServer.on('connection',function(socket){
  console.log('connect')
  socket.emit('data', 'hello world');
  socket.on('data', (data)=>{
    console.log(data)
    socketClient.emit('data', data)
  });

  socket.on('disconnect', ()=>{
    console.log('disconnect')
  });
});


http.listen(PORT, function(){
  console.log('start listening port: ', PORT);
});

drone.on('navdata',(navdata)=>{
  // https://github.com/felixge/node-ar-drone/blob/master/docs/NavData.md

  let currentTime = Date.now();
  // calucurate navdata
  droneState.psi = navdata.demo.frontBackDegrees;
  droneState.theta = navdata.demo.leftRightDegrees;
  droneState.phi = navdata.demo.clockwiseDegrees;

  if(lastTime){
  /*
    droneState.x = droneState.x + navdata.demo.xVelocity * (lastTime - currentTime) /1000
    droneState.y = droneState.y + navdata.demo.yVelocity * (lastTime - currentTime) /1000
    droneState.z = droneState.z + navdata.demo.zVelocity * (lastTime - currentTime) /1000
  */
  }
  

  // send navdata
  const data = {
    hostname: HOSTNAME,
    navdata: navdata
  }
  console.log(data);
  socketClient.emit('data', data)

  lastTime = currentTime;
});

console.log("start runnning PORT: "+PORT)
