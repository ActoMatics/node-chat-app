let socket = io(); //creates the connection

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('Received a New message', message);

    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let li = jQuery('<li></li>'),
        a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}:`);
    // set attribute 
    a.attr('href', message.url);

    li.append(a);
    // add it to the DOM 
    jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
    // using event (e) to prevent browser default behavior to default upon submitting a form
    e.preventDefault();

    let messageTextBox = jQuery('[name="message"]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        // clears the text field once a message was emitted
        messageTextBox.val('');
    });
});


let locationButton = jQuery('#send-location');

// add click event
locationButton.on('click', function () {
    if(!navigator.geolocation) 
        return alert('Geolocation not supported by your browser');
    
    // disable button while sending location    
    locationButton.attr('disabled', 'disabled').text('Sending location')
    
    navigator.geolocation.getCurrentPosition(function (position) {
        // re enable button once location sent
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to get location without your permission');
    })    
})