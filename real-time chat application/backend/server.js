const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let rooms = ['General', 'Technology', 'Sports'];

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('roomList', rooms);

    socket.on('join', (username) => {
        console.log(${username} has joined the chat);
        socket.username = username;
    });

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(${socket.username} joined ${room});
        io.to(room).emit('message', ${socket.username} has joined ${room});
    });

    socket.on('message', (message) => {
        const room = Object.keys(socket.rooms).filter(item => item != socket.id)[0];
        if (room) {
            io.to(room).emit('message', ${socket.username}: ${message});
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
