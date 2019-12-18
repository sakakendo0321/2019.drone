const fs = require('fs');
const os = require('os')
const arDrone = require('ar-drone');
var express = require('express');
var app = express();
var http = require('http').Server(app);
const ioServer = require('socket.io')(http);

const drone = arDrone.createClient();
drone.config('general:navdata_demo','FALSE')
drone.takeoff();

const HOSTNAME = os.hostname()
const HOST = process.env.HOST || '192.168.20.1'
const PORT = process.env.PORT | 8000

const ioClient = require('socket.io-client');
const socketClient = ioClient.connect(HOST + PORT);

let droneState = {
  pos: [ ]
  psi: 0,
  phi: 0,
  theta: 0,
/*  x: 0,
  y: 0,
  z: 0,
  */
}
let lastTime = null;

app.use(express.static('./static'))

function Matrix(mat, col, row){
  this.mat = mat;
  this.col = col;
  this.row = row;

  this.add = function add(target){
    if(this.col === target.col && this.row == target.row){
      throw('error at add', this.mat, target.mat);
    }
//    for(let i=0; i<a.length; i++) a[i] += b[i];
    return a;
  }

  this.dot = function dot(a, b){

    return a;
  }
}

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

  drone.on('navdata',(navdata)=>{
    // https://github.com/felixge/node-ar-drone/blob/master/docs/NavData.md

    let currentTime = Date.now();
    if(typeof navdata.demo !== 'undefined'){
      droneState.psi = navdata.demo.frontBackDegrees;
      droneState.theta = navdata.demo.leftRightDegrees;
      droneState.phi = navdata.demo.clockwiseDegrees;

      if(lastTime){
        const dt = ((lastTime - currentTime) /1000);
        const displacement = [
          navdata.demo.xVelocity * dt,
          navdata.demo.yVelocity * dt,
          navdata.demo.zVelocity * dt,
        ];
        const Rx = [
          [],
          [],
          [],
        ],
        Ry = [
        ],
        Rz = [
        
        ];
        droneState.pos = add(droneState.pos, dot(Rx, dot(Ry, dot(Rz, displacement))))
      }
      const data = {
        hostname: HOSTNAME,
        state: droneState
      }
      console.log(data);
      socket.emit('data', data)
    }else{
      console.error('navdata is undefined');
    }
    lastTime = currentTime;
  });
});


http.listen(PORT, function(){
  console.log('start listening port: ', PORT);
});



console.log("start runnning PORT: "+PORT)
