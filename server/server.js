const WebSocket = require('ws');
const express = require('express');

let app = express();

let httpserver = app.listen(5000);


// let server=new WebSocket.Server({port:5000},()=>{   //we can also pass my http server
let server = new WebSocket.Server({
    //  server: httpserver ,
    noServer: true,
    verifyClient: (info) => {
        return true
    }
}, () => {
    console.log("Web socket is ready");
},

)

let clientarray = [];
server.on('connection', (client) => {
    clientarray.push(client);
    client.on('message', function (event) {
        //  clientarray.forEach((clnt)=>{
        server.clients.forEach((clnt) => {
            if (clnt.readyState === clnt.OPEN) {
                clnt.send(event.toString());
            }
        })
    })

})

// if noServer is true

httpserver.on('upgrade',async function upgrade(request, socket, head){
      
    // return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii')
    server.handleUpgrade(request,socket,head,function done(client){
        server.emit('connection',client,request)
    })  
})