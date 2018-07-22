let socket = io(); //creates the connection

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage, received a New message', message);
});

