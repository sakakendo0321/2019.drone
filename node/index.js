const fs = require('fs');
const arDrone = require('ar-drone');
var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static('./static'))
const ioServer = require('socket.io')(http);
var {Matrix, local2Global, global2Local} = require('./libs/matrix');

const drone = arDrone.createClient();
const udpDrone = arDrone.createUdpControl();
drone.config('general:navdata_demo','FALSE')
drone.takeoff();

const HOST_INDEX = process.env.HOST_INDEX ?  process.env.HOST_INDEX : 0;
console.log(HOST_INDEX)
const HOST = process.env.HOST || '192.168.20.1'
const PORT = process.env.PORT | 8000

const ioClient = require('socket.io-client');
const socketClient = ioClient.connect(HOST + PORT);

let lastTime = null;
let pos = new Matrix([[0], [0], [0]], 1, 3);
let state={
  index: HOST_INDEX,
  pos:[],
  displacement:[],
  euler: {},
  target: null /*{
    x: null,
    y: null,
  }*/
};

async function calcState(state, navdata, currentTime, lastTime){
//  console.log('navdata', navdata)
  if(typeof navdata.demo !== 'undefined'){
    /* navdata
     * https://github.com/felixge/node-ar-drone/blob/53e66221e6d7fc48fb2ccf8d9f11275e8d1e1092/lib/navdata/parseNavdata.js
     * Velocity: [mm/s]
     * Degreess [mdeg]
     */
    const {frontBackDegrees, leftRightDegrees,clockwiseDegrees,
        xVelocity, yVelocity,zVelocity,
        batteryPercentage} = navdata.demo;
    euler = {
      pitch: frontBackDegrees * (Math.PI/180),
      roll: leftRightDegrees * (Math.PI/180),
      yaw: clockwiseDegrees * (Math.PI/180)
    }
    if(lastTime){
      const dt = ((currentTime - lastTime) /1000);
      const displacement = new Matrix([
        [xVelocity / 1000 * dt], 
        [yVelocity / 1000 * dt],
        [zVelocity / 1000 * dt],
      ], 1, 3);
      let diff = local2Global(euler, displacement);
      pos = pos.add(diff);
      state.displacement = [
        displacement.mat[0][0],
        displacement.mat[1][0],
        displacement.mat[2][0],
      ];
      state.diff = [
          diff.mat[0][0],
          diff.mat[1][0],
          diff.mat[2][0],
      ]
      state.pos = [
        pos.mat[0][0],
        pos.mat[1][0],
        pos.mat[2][0],
      ];
      state.euler = euler;
    }
  }else{
    console.error('navdata is undefined');
  }
}

drone.on('navdata',async (navdata)=>{
  let currentTime = await Date.now();
  console.log('navdata', navdata)
  await calcState(state, navdata, currentTime, lastTime);
  console.log(currentTime, lastTime, state.pos, state.displacement);
  lastTime = currentTime;
});

ioServer.on('connection',function(socket){
  console.log('connect')
  socket.emit('data', 'hello world');
  socket.on('control', (data)=>{
    // transmit data and instrucion to frontwards
    console.log('contorl data: ', data);
    console.log(data.index, HOST_INDEX, state.index)
    if(data.index === HOST_INDEX){
      if(data.order === 'land') drone.land();
      else if(data.order === 'takeof') drone.takeoff();
      else if(data.order === 'getState'){
        console.log('emit state', state)
        socket.emit('data', {
          state
        });
      }
    }else{
      socketClient.emit('control', data);
    }
  });

  socket.on('data', (data)=>{
    // transmit data to backward
    if(data.index === 0 && HOST_INDEX !== 0){
      state.target = {
        x: data.x,
        y: data.y,
        z: data.z
      };
    }
    socket.emit('data', data);
  });

  socket.on('disconnect', ()=>{
    console.log('disconnect')
  });
});

http.listen(PORT, function(){
  console.log('start listening port: ', PORT);
});


function main(){
  console.log('main');
  if(HOST_INDEX === 0) return;
  setTimeout(()=>{
    console.log('state, target',state.pos, state.target);
    if(state.target && state.pos){
      let xdiff =  state.target.x - state.pos[0],
        ydiff = state.target.y - state.pos[1] ;
        if(xdiff >0 && ydiff > 0 ) udpDrone.pcmd({
          front: 0.5,
          right: 0.5,
        });
        else if(xdiff < 0 && ydiff > 0 ) udpDrone.pcmd({
          back: 0.5,
          right: 0.5,
        });
        else if(xdiff > 0 && ydiff < 0 ) udpDrone.pcmd({
          front: 0.5,
          left: 0.5,
        });
        else if(xdiff < 0 && ydiff < 0 ) udpDrone.pcmd({
          back: 0.5,
          left: 0.5,
        });
    }
    main();
  }, 1000)
}

main();
console.log("start runnning PORT: "+PORT)
