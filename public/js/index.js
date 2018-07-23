let socket = io(); //creates the connection

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('Received a New message', message);
});

socket.emit('createMessage', {
    from: 'Danny',
    text: 'Sup?'
}, function(data) {
    console.log('Got Message!', data);
})
