var socket = io();

const scrollToBottom = () => {
  // Selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

const formattedTime = (timestamp) => moment(timestamp).format('h:mm a');

socket.on('connect', function() {
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }

  });
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', users => {
  const ol = jQuery('<ol></ol>');
  users.forEach(user => ol.append(jQuery('<li></li>').text(user)));

  jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
  const template = jQuery('#message-template').html();
  const timeFormated = formattedTime(message.createdAt);
  const html = Mustache.render(template, {...message, createdAt: timeFormated});

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  const template = jQuery('#location-message-template').html();
  const timeFormated = formattedTime(message.createdAt);
  const html = Mustache.render(template, {...message, createdAt: timeFormated});

  jQuery('#messages').append(html);
  scrollToBottom();
});

$(document).ready(function() {
  $('#message-form').on('submit', function(e) {
    e.preventDefault();
    let messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
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

