import express from 'express'
import http from 'http';
import socket from 'socket.io';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
var app = express();
var server = http.Server(app);
var io = socket.listen(server);
var players = {};
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public/dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + 'public/dist/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    // create a new player and add it to our players object
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    console.log(players);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });
    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });
    socket.on('playerShoot', function(shootData) {
        players[socket.id].x = shootData.x;
        players[socket.id].y = shootData.y;
        players[socket.id].rotation = shootData.rotation;
        socket.broadcast.emit('playerShot', players[socket.id]);
    })
});

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});