const mapObj = require('map-obj');
const { camelCase } = require('lodash');
const Cache = require('quick-lru');

const cache = new Cache({ maxSize: 100000 });

function unSlashIt(str) {
  return str.replace(/^(\/*)|(\/*)$/g, '');
}

function leadingSlashIt(str) {
  return '/' + unSlashIt(str);
}

function trailingSlashIt(str) {
  return unSlashIt(str) + '/';
}

function doubleSlashIt(str) {
  return '/' + unSlashIt(str) + '/';
}

function camelCaseKeys(input, options) {
  const camelCaseConvert = (input, options) => {
    options = {
      deep: false,
      ...options,
    };

    const { exclude } = options;

    return mapObj(
      input,
      (key, value) => {
        if (
          !(
            exclude &&
            exclude.some(x => (typeof x === 'string' ? x === key : x.test(key)))
          )
        ) {
          if (cache.has(key)) {
            key = cache.get(key);
          } else {
            const ret = camelCase(key);

            if (key.length < 100) {
              // Prevent abuse
              cache.set(key, ret);
            }

            key = ret;
          }
        }

        return [key, value];
      },
      { deep: options.deep }
    );
  };
  if (Array.isArray(input)) {
    return Object.keys(input).map(key => camelCaseConvert(input[key], options));
  }

  return camelCaseConvert(input, options);
}

module.exports = {
  unSlashIt,
  leadingSlashIt,
  trailingSlashIt,
  doubleSlashIt,
  camelCaseKeys,
};
