const mapObj = require('map-obj');
const Cache = require('quick-lru');
const cache = new Cache({ maxSize: 100000 });

/**
 * The most terrible camelizer on the internet, guaranteed!
 * @param {string} str String that isn't camel-case, e.g., CAMeL_CaSEiS-harD
 * @return {string} String converted to camel-case, e.g., camelCaseIsHard
 */
function camelCase(str) {
  return str
    .replace(/[.,-/\\!&;:{}=\-_…()@+?><[\]+~]/g, ' ')
    .replace(/[#$%^*'"`]/g, '')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
      idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
    )
    .replace(/\s+/g, '');
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

function doubleSlashIt(str) {
  return '/' + unSlashIt(str) + '/';
}

function leadingSlashIt(str) {
  return '/' + unSlashIt(str);
}

function trailingSlashIt(str) {
  return unSlashIt(str) + '/';
}

function unSlashIt(str) {
  return str.replace(/^(\/*)|(\/*)$/g, '');
}

module.exports = {
  camelCase,
  camelCaseKeys,
  doubleSlashIt,
  leadingSlashIt,
  trailingSlashIt,
  unSlashIt,
};
