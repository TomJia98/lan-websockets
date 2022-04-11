var Gpio = require('onoff').Gpio; 
var LED = new Gpio(4, 'out');




const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes')

// const http = require('http').createServer();
const http = require('http');
const server = http.createServer(app);

app.use(express.static('public'));
app.use(router)

const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');
io.emit('lightStart', LED.readSync())
    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );  
        
    })
    
    socket.on("light", (isLight) => {
        console.log(isLight);
        if(isLight === 1 && LED.readSync()===0) {
            LED.writeSync(1);
        }
        console.log(typeof isLight)
        io.emit('light', isLight)

    });
});



server.listen(80, '10.1.1.198', () => {
    console.log('server launched @ http://10.1.1.198:80 ');
});


 
