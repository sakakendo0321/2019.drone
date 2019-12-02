const fs = require('fs');
const http = require('http');
const server = http.createServer();
const os = require('os')
const arDrone = require('ar-drone');
const drone = arDrone.createClient();
drone.config('general:navdata_demo','FALSE')

const HOSTNAME = os.hostname()
const HOST = process.env.HOST || '192.168.20.1'
const PORT = process.env.PORT | 8000

const ioServer = require('socket.io').listen(server);
server.listen(PORT)
const ioClient = require('socket.io-client');
const socketClient = ioClient.connect(HOST + PORT);

ioServer.sockets.on('connection',function(socket){
  console.log('connect')

  socket.on('data', (data)=>{
    console.log(data)
    socket.emit('data', data)
  });
});

socketClient.on('data',(data)=>{
  console.log(data);
});

drone.on('navdata',(navdata)=>{
  // https://github.com/felixge/node-ar-drone/blob/master/docs/NavData.md
  const data = {
    hostname: HOSTNAME,
    navdata: navdata
  }
  console.log(data);
  // socketClient.emit('data', data)
});

console.log('start runnning')
