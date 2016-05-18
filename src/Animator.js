'use strict';

class Animator {
  constructor() {
      this.animations = [];
      this.timer = null;
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

    const animation = self.animations.shift();
    if(animation) {
      console.log(`${animation.test} for ${animation.duration} milliseconds`);

      self.timer = setTimeout(function() {
        if(self.animations.length) {
          if(self.isPlaying) {
            self.play();
          }
        } else {
          self.isPlaying = false;
          self.timer = null;
        }
      }, animation.duration);
    }
  }

  stop() {
    this.isPlaying = false;
  }

  empty() {
    this.animations = [];
    this.isPlaying = false;
    this.timer = null;
  }
}

module.exports = Animator;
