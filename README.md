# i-love-chips-16

## Running on OSX or Linux

* `npm install`
* `bower install`
* `npm dry` (Dry Run, without I2C)

## Running on Raspi

Libraries for I2C have to be installed and built separately on
Raspi since build fails on OSX systems.

* `npm install`
* `sudo npm -g install bower`
* `npm install i2c-bus pca9685`
* `bower install`
* `npm dev` (run with I2C)
