const path = require('path'),
    publicPath = path.join(__dirname, '../public'),
    express = require('express'),
    http = require('http'),
    socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./util/message');

let app = express(),
    server = http.createServer(app),
    io = socketIO(server); // allow us to emit and submit events

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', function (socket) {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome To This Awesome Chat Room!'));

    socket.broadcast.emit('newMessage',  generateMessage('Admin', 'New User Joined'));

    // message sent from a user to a user
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage',  generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function () {
        console.log('User was disconnected');
    })
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});