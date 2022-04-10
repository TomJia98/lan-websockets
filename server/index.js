const express = require('express');
const app = express();
const path = require('path');

// const http = require('http').createServer();
const http = require('http');
const server = http.createServer(app);

app.use(express.static('app'));


const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );  
        console.log(socket.id) 
        
    });
});


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/app/index.html'))
);

server.listen(80, '10.1.1.198', () => {
    console.log('server launched');
});


 
