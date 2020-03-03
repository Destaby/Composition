'use strict';

const EventEmitter = function() {
  this.events = {};
};

EventEmitter.prototype.on = function(name, fn) {
  const event = this.events[name];
  if (event) event.push(fn);
  else this.events[name] = [fn];
};

EventEmitter.prototype.emit = function(name, ...data) {
  const event = this.events[name];
  if (!event) return;
  for (const fn of event) {
    fn(...data);
  }
};

const f = new EventEmitter();
f.on('error', e => {
  console.log(`${e} is not a function`);
});

const compose = (...functions) => {
  for (let i = 0; i < functions.length; i++) {
    if (typeof functions[i] !== 'function') {
      f.emit('error', functions[i]);
      return undefined;
    }
  }
  const res = x => functions.reverse().reduce((v, f) => f(v), x);
  return res;
};

module.exports = { compose };
