'use strict';

const EventEmitter = require('events').EventEmitter;

const config = require('../config/config');
const Animator = require('./Animator');

const logger = require('winston');

class I2CManager extends EventEmitter {
  constructor() {
    super();
    const self = this;

    this.ready = false;
    this.animator = new Animator();

    if (!config.DRY_RUN) {
      let i2cBus = require("i2c-bus");
      let Pca9685Driver = require("pca9685").Pca9685Driver;

      let options = {
        i2c: i2cBus.openSync(1),
        address: 0x40,
        frequency: 60,
        debug: false
      };

      this.pwm = new Pca9685Driver(options, () => {
        self.emit('ready');

        for (let i; i < 5; i++) {
          pwm.setPulseRange(i, 0, 255);
          pwm.setPulseLength(i, 20000);
        }

        this.ready = true;
      })
    } else {
      this.ready = true;
    }
  }

  isReady() {
    return this.ready
  }

  sendAngleToMotor(motor, angle) {
    if (this.ready) {
      if (angle < 10) angle = 10;
      if (angle > 120) angle = 120;


      if (!config.DRY_RUN) {
        this.pwm.setDutyCycle(motor, angle / 1000);
      } else {
        logger.info('this.pwm.setDutyCycle(motor, angle / 1000)');
      }
    } else {
      logger.error("not ready");
    }
  }

  sendAnimation(json) {
    const self = this;

    json.map(function (frame) {
      self.animator.queue({
        //duration: 1000 / 24, // 24fps
        duration: 1000, // for test
        motors: frame
      });
    });

    self.animator.play(function (frame) {
      let motors = frame['motors'];
      logger.info('play anim', motors);

      for (let i = 0; i < motors.length; i++) {
        logger.info('setDutyCycle', motors[i] / 1000);
        self.pwm.setDutyCycle(i, motors[i] / 1000);
      }
    });
  }
}

module.exports = I2CManager;