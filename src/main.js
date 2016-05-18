'use strict';

const config = require('../config/config');

const animator = new (require('./Animator'))();
const communication = new (require('./Communication'))();

if(!config.DRY_RUN) {
  const i2CManager = (require('./I2CManager'))();

  i2CManager.on('ready', function() {
    communication.on('sendCommand', function(cmd) {
      i2CManager.sendAngleToMotor(cmd.motor, cmd.angle);
    });
  });
} else {
  communication.on('sendCommand', function(cmd) {
    console.log(`command received on dry run, angle: ${cmd.angle}, motor: ${cmd.motor}`);
  });
}