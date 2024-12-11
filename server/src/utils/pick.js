function pick(object = {}, keys = []) {
  const newObj = {};
  keys.forEach((key) => {
    if (object && key in object) {
      newObj[key] = object[key];
    }
  });
  return newObj;
}

module.exports = pick;
