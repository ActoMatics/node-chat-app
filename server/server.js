const path = require('path'),
    publicPath = path.join(__dirname, '../public'),
    express = require('express'),
    http = require('http'),
    socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./util/message'),
    {isRealString} = require('./util/validation'),
    {Users} = require('./util/users');

let app = express(),
    server = http.createServer(app),
    io = socketIO(server), // allow us to emit and submit events
    users = new Users();

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// io.emit - emits - emits to every connect user
// socket.broadcast.emit - emits to every one connect to the server except for the current user
// socket.emit - emits to a specific one user

io.on('connection', function (socket) {
    console.log('New user connected');

    socket.on('join', (params, callback) => {

        if(!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Name and room name are required')
        }

        // join rooms, emit chat message to only people in the same room
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        // update users list with the users array. Emitting an event to everyone in the chat
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // io.emit -> io.to.emit  -> send to everyone connected to the room
        socket.emit('newMessage', generateMessage('Admin', 'Welcome To This Awesome Chat Room!'));

        // socket.broadcast.emit -> socket.broadcast.to -> send to everyone in the room except for the current user
        socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

        callback();
    });

    // message sent from a user to a user
    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        // prevent user from sendind invalid message
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(`${user.name}`, message.text));
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', function () {
        let user = users.removeUser(socket.id);

        if(user) {
            // update user list if a user leaves the room
            io.to(user.room ).emit('updateUserList', users.getUserList(user.room));
            // print a message to inform user left the room
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left room`));
        }
        
    })
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});