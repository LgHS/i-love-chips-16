'use strict';

const EventEmitter = require('events').EventEmitter;

const SocketIO = require('socket.io');
const logger = require('winston');

class Communication extends EventEmitter {
  constructor() {
    super();
    this.io = SocketIO.listen(8081);
    logger.info('socket.io is running');

    this.listen();
  }

  listen() {
    const self = this;

    this.io.sockets.on('connection', function(socket) {
      logger.info('A client is connected');

      socket.on('send-command', function(cmd) {
        self.emit('sendCommand', {
          angle: cmd.angle,
          motor: cmd.motor
        });
      });

      socket.on('send-animation', function(json) {
        self.emit('sendAnimation', json);
      });
    });
  }
}

module.exports = Communication;