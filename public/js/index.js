let socket = io(); //creates the connection

socket.on('connect', () => {
    console.log('Connected to server');

    // from the client to the server
    socket.emit('createMessage', {
        from: 'sender@example.com',
        text: 'Hi, check out this call sending socket IO feature',
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage, received a New message', message);
});