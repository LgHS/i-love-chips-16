'use strict';

const EventEmitter = require('events').EventEmitter;

const i2cBus = require("i2c-bus");
const Pca9685Driver = require("pca9685").Pca9685Driver;

const options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 60,
    debug: false
};

class I2CManager extends EventEmitter {
	constructor() {
		super();
		const self = this;

		this.ready = false;
		this.pwm = new Pca9685Driver(options, () => {
			self.emit('ready');

			for(let i; i<5; i++) {
				pwm.setPulseRange(i, 0, 255);
				pwm.setPulseLength(i, 20000);
			}

			this.ready = true;
		})
	}

	isReady() {
		return this.ready
	}
	
	sendAngleToMotor(motor, angle) {
		if(this.ready){
			if(angle < 10) angle = 10;
			if(angle > 120) angle = 120;
			this.pwm.setDutyCycle(motor, angle / 1000);
		} else {
			console.error("not ready");
		}
	}
}

module.exports = I2CManager;