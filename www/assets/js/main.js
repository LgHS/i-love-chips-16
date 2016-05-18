(function($) {
  var socket = io('http://' + window.location.hostname + ':8081');

  $('body').communication({
    socket: socket
  });
}(jQuery));