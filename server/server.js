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

     // from the server to the client
    socket.emit('newMessage', {
        from: 'sendMessage@example.com',
        text: 'Hi, this is dummy text I am sending a message',
        createdAt: new Date()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', function() {
        console.log('User was disconnected');
    })
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });