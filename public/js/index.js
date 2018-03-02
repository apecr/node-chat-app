var socket = io();

const formattedTime = (timestamp) => moment(timestamp).format('h:mm a');

socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
  let li = jQuery('<li class="list-group-item"></li>');
  li.text(`${message.from} ${formattedTime(message.createdAt)}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let li = jQuery('<li class="list-group-item"></li>');
  let a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from} ${formattedTime(message.createdAt)}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

$(document).ready(function() {
  $('#message-form').on('submit', function(e) {
    e.preventDefault();
    let messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextBox.val()
    }, function() {
      messageTextBox.val('');
    });
  });
  let locationButton = $('#send-location');
  locationButton.on('click', function() {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(
      function(position) {
        socket.emit('createLocationMessage', {latitude: position.coords.latitude, longitude: position.coords.longitude});
        locationButton.removeAttr('disabled').text('Send location');
      },
      function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
      });
  });
});

