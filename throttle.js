const throttle = (func, wait = 0) => {
  let skip = true;
  return (...args) => {
    if (skip) {
      func(...args);
      skip = false;
      setTimeout(() => (skip = true), wait);
    }
  };
};
/**
 * @param {Function} func
 * @param {number} wait
 * @param {Object} options
 * @param {boolean} [options.leading=false] 
 * @param {boolean} [options.trailing=false]
 */
const opThrottle = (
  func,
  wait = 0,
  obj = { leading: false, trailing: false }
) => {
  let skip = true;
  let timeout;
  let first = true;
  return (...args) => {
    if (obj.leading && obj.trailing) {
      if (skip) {
        // clearTimeout(timeout);
        if (timeout == undefined) {
          func(...args);
          skip = false;
          timeout = setTimeout(() => (skip = true), wait);
        }
      } else {
        timeout = setTimeout(() => {
          func(...args);
          skip = true;
          timeout = undefined
        }, wait);
      }
    } else if (obj.leading) {
      if (skip) {
        func(...args);
        skip = false;
        setTimeout(() => (skip = true), wait);
      }
    } else if (obj.trailing) {
      if (!first) {
        if (skip) {
          if (timeout == undefined) {
            func(...args);
            skip = false;
            timeout = setTimeout(() => (skip = true), wait);
          }
        } else {
          timeout = setTimeout(() => {
            func(...args);
            skip = true;
            timeout = undefined;
          }, wait);
        }
      }
      timeout = setTimeout(() => (skip = true), wait);
      skip = false;
      first = false;
    }
  };
};
