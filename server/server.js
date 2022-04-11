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
    
    socket.on("lightClicked", (isLight) => {
        console.log(isLight);
        if(isLight === 1 && LED.readSync()===0) {
            LED.writeSync(1);
        } else if (isLight === 0 && LED.readSync()===1) {
            LED.writeSync(0)

        }
        console.log(typeof isLight)
        io.emit('lightChanged', isLight)

    });
});



server.listen(8080, '10.1.1.53', () => {
    console.log('server launched @ http://10.1.1.53:8080 ');
});


 
