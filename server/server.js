const path = require('path'),
    publicPath = path.join(__dirname, '../public'),
    express = require('express'),
    http = require('http'),
    socketIO = require('socket.io');

let app = express(),
    server = http.createServer(app),
    io = socketIO(server); // allow us to emit and submit events

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', function (socket) {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the Chat Room!',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // io.emit emit emtis an event to every single connection
        // sends the emit to anybody but this socket = when I send a message it will be fired to everyone but me
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        
        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     });
    });


    socket.on('disconnect', function () {
        console.log('User was disconnected');
    })
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});