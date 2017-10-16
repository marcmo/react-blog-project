const object2string = (o) => {
  if (o == null) {
    return 'null';
  }
  const seen = [];
  const replacer = (key, value) => {
    if (value != null && typeof value === 'object') {
      if (seen.indexOf(value) >= 0) {
        return 'has cycles';
      }
      seen.push(value);
    }
    return value;
  };
  return JSON.stringify(o, replacer);
};

const log = {
  d: (s, o) => {
    if (undefined === o) {
      console.log(`[postserver] ${s}`);
    } else {
      console.log(`[postserver] ${s} "${object2string(o)}"`);
    }
  },
  w: (s, o) => {
    if (undefined === o) {
      console.warn(`[postserver] ${s}`);
    } else {
      console.warn(`[postserver] ${s} ${object2string(o)}`);
    }
  },
  e: (s) => {
    console.error(`[postserver] ${s}`);
  },
};
module.exports = {
  log,
}
