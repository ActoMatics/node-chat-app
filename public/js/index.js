let socket = io(); //creates the connection

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a'),
        template = jQuery('#message-template').html(),
        html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    // adds a timestamp to location
    let formattedTime = moment(message.createdAt).format('h:mm a'),
        template = jQuery('#location-message-template').html(),
        // render the htmp template
        html = Mustache.render(template, {
            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });

    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
    // using event (e) to prevent browser default behavior to default upon submitting a form
    e.preventDefault();

    let messageTextBox = jQuery('[name="message"]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        // clears the text field once a message was emitted
        messageTextBox.val('');
    });
});


let locationButton = jQuery('#send-location');

// add click event
locationButton.on('click', function () {
    if (!navigator.geolocation)
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