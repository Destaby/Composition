'use strict';

const pipe = (...fns) => {
  for (let i = 0; i < fns.length; i++) {
    if (typeof fns[i] !== 'function') throw new Error('Fns must be functions');
  }
  const res = x => {
    const result = fns.reduce((v, f) => f(v), x);
    return result;
  };
  return res;
};

module.exports = { pipe };
