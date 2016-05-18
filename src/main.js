'use strict';

  const animator = new (require('./Animator'))();

animator.queue({
  duration: 3000,
  test: "hello 1"
}).queue({
  duration: 2000,
  test: "hello 2"
}).queue({
  duration: 1000,
  test: "hello 3"
});

animator.play();
