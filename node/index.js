const fs = require('fs');
const os = require('os')
const arDrone = require('ar-drone');
var express = require('express');
var app = express();
var http = require('http').Server(app);
const ioServer = require('socket.io')(http);
var {Matrix, local2Global, global2Local} = require('./libs/matrix');

const drone = arDrone.createClient();
drone.config('general:navdata_demo','FALSE')
drone.takeoff();

const HOSTNAME = os.hostname()
const HOST = process.env.HOST || '192.168.20.1'
const PORT = process.env.PORT | 8000

const ioClient = require('socket.io-client');
const socketClient = ioClient.connect(HOST + PORT);


let lastTime = null;

let data={};
/*
let pos = new Matrix([[0], [0], [0]], 1, 3)
let euler =  new Object();
*/

app.use(express.static('./static'))

drone.on('navdata',(navdata)=>{
  let currentTime = Date.now();
  const {frontBackDegrees, leftRightDegrees,clockwiseDegrees,
      xVelocity, yVelocity,zVelocity} = navdata.demo;
  if(typeof navdata.demo !== 'undefined'){
    euler.pitch= frontBackDegrees * (Math.PI/180);
    euler.roll = leftRightDegrees * (Math.PI/180);
    euler.yaw = clockwiseDegrees * (Math.PI/180);
    if(lastTime){
      const dt = ((currentTime - lastTime) /1000);
      const displacement = new Matrix([
        [xVelocity * dt], 
        [yVelocity * dt],
        [zVelocity * dt],
      ], 1, 3);
      let diff = local2Global(euler, displacement);
      console.log('displacement',displacement.mat, 'diff', diff.mat);
      pos = pos.add(diff);
    }
    data = {
      hostname: HOSTNAME,
      state: {
        global: [
          pos.mat[0][0],
          pos.mat[1][0],
          pos.mat[2][0],
        ],
        euler,
      }
    }
    console.log(data);
    socket.emit('data', data)
  }else{
    console.error('navdata is undefined');
  }
  lastTime = currentTime;
});

ioServer.on('connection',function(socket){
  console.log('connect')
  socket.emit('data', 'hello world');
  socket.on('data', (data)=>{
    console.log(data)

    while(true){
      setTimeout(function(){
        console.log('socket emit', data);
        socket.emit('data', data)
        socketClient.emit('data', data)
      }, 10)
    }
  });

  socket.on('disconnect', ()=>{
    console.log('disconnect')
  });
});

http.listen(PORT, function(){
  console.log('start listening port: ', PORT);
});

console.log("start runnning PORT: "+PORT)
