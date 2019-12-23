const fs = require('fs');
const arDrone = require('ar-drone');
var express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static('./static'))
const ioServer = require('socket.io')(http);
var {Matrix, local2Global, global2Local} = require('./libs/matrix');

const drone = arDrone.createClient();
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
  target: {
    x: null,
    y: null,
  }
};

drone.on('navdata',(navdata)=>{
  let currentTime = Date.now();
  if(typeof navdata.demo !== 'undefined'){
    /* navdata
     * https://github.com/felixge/node-ar-drone/blob/53e66221e6d7fc48fb2ccf8d9f11275e8d1e1092/lib/navdata/parseNavdata.js
     * Velocity: [mm/s]
     * Degreess [mdeg]
     */
    const {frontBackDegrees, leftRightDegrees,clockwiseDegrees,
        xVelocity, yVelocity,zVelocity} = navdata.demo;
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
      console.log('displacement',displacement.mat, 'diff', diff.mat);
      pos = pos.add(diff);
      state.displacement = [
        displacement.mat[0][0],
        displacement.mat[1][0],
        displacement.mat[2][0],
      ];
      state.pos = [
        pos.mat[0][0],
        pos.mat[1][0],
        pos.mat[2][0],
      ];
      state.euler = euler;
      console.log('target, pos',state.target, state.pos);
    }
  }else{
    console.error('navdata is undefined');
  }
  lastTime = currentTime;
});

ioServer.on('connection',function(socket){
  console.log('connect')
  socket.emit('data', 'hello world');
  socket.on('control', (data)=>{
    console.log('contorl data: ', data);
    console.log(data.index, HOST_INDEX, state.index)
    if(data.index === HOST_INDEX){
      if(data.order === 'land') drone.land();
      else if(data.order === 'takeof') drone.takeoff();
      else if(data.order === 'position'){
        state.target = {
          x: data.x,
          y: data.y
        }
      } 
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

  socket.on('disconnect', ()=>{
    console.log('disconnect')
  });
});

http.listen(PORT, function(){
  console.log('start listening port: ', PORT);
});

console.log("start runnning PORT: "+PORT)
