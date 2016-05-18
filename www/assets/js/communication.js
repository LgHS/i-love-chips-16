(function($) {
  $.fn.communication = function(params) {
    var socket = params.socket;

    $('#send-command-form').on('submit', function(e) {
      e.preventDefault();

      console.log('sending message through socket');
      var motor = $('#send-motor-input').val();
      var angle = $('#send-angle-input').val();
      socket.emit('send-command', {
        motor: motor,
        angle: angle
      });
    });
  }
}(jQuery));