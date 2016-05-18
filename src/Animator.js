'use strict';

const I2CManager = require('./I2CManager');

class Animator {
  constructor() {
      this.animations = [];
      this.timer;
      this.isPlaying = false;
  }

  queue(jsonData) {
    this.animations.push(jsonData);
    return this;
  }

  play() {
    const self = this;

    if(!this.isPlaying) {
      this.isPlaying = true;
    }

    (function() {
      const animation = self.animations.shift();
      if(animation) {
        console.log(`${animation.test} for ${animation.duration} milliseconds`);

        self.timer = setTimeout(function() {
          if(self.animations.length) {
            self.play();
          } else {
            self.isPlaying = false;
          }
        }, animation.duration);
      }
    })();
  }
}

module.exports = Animator;
