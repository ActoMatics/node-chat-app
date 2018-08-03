// Client side
let socket = io(); //creates the connection

function scrollToBottom () {
    // selectors
    let messages = jQuery('#messages'),
        newMessage = messages.children('li:last-child');
    // Heights , prop = across all browsers allow to fetch a property
    let clientHeight = messages.prop('clientHeight'),
        scrollTop = messages.prop('scrollTop'),
        scrollHeight = messages.prop('scrollHeight'),
        newMessageHeight = newMessage.innerHeight(),
        lastMessageHeight = newMessage.prev().innerHeight();

        // calculate scroll
        if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop(scrollHeight);
        }
}

socket.on('connect', () => {
    // converts the user login params
    let params = jQuery.deparam(window.location.search);
    // join chat
    socket.emit('join', params, function (err) {
        if(err) {
            // re-direct user back to home page in case of an error
            alert(err);
            window.location.href = '/';
        } else {
          //  console.log('No Error on login');
        }
    });
});

socket.on('updateUserList', function (users) {
   let ol = jQuery('<ol></ol>');

   //updates the user list on the client side
   users.forEach(user => {
       ol.append(jQuery('<li></li>').text(user));
   });
   // add list to the DOM. Not using append since we don't want to update the list, we want to
   // wipe the list replacing it with the new version
   jQuery('#users').html(ol);
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
    scrollToBottom();
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
    scrollToBottom();
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