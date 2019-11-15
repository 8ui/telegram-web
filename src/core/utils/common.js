import { inflate } from 'pako/lib/inflate';

export const parseStickerData = async(blob) => {
  const r = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const result = inflate(e.target.result, { to: 'string' });
        resolve(JSON.parse(result));
      } catch (err) {
        reject({ key, error: true, msg: err.toString() });
      }
    };
    reader.readAsArrayBuffer(blob);
  })

  return r;
}

export const getAllowPassProps = (vdom, reverse = false) => {
  const props = getv(vdom, 'func.props') || {};
  const result = {}
  for (var prop in props) {
    if (!reverse && typeof props[prop] !== 'function') {
      result[prop] = props[prop];
    } else if (reverse && typeof props[prop] === 'function') {
      result[prop] = props[prop];
    }
  }
  return result;
}

export function diffProps(a, b) {
  const prev = {}
  const next = {}
  const result = {}
  for (var i in a) {
    if (a.hasOwnProperty(i) && typeof a[i] === 'string' && a[i] !== b[i]) {
      prev[i] = a[i]
    }
  }
  for (var i in b) {
    if (b.hasOwnProperty(i) && (typeof b[i] === 'string' || !b[i]) && a[i] !== b[i]) {
      next[i] = b[i]
    }
  }
  for (var i in { ...prev, ...next }) {
    result[i] = next[i] || '';
  }
  return result;
}

export function getv(obj, key) {
  let result = obj;
  const keys = key.split('.');
  for (let i = 0; i < keys.length; i++) {
    if (!result || !result[keys[i]]) return undefined;
    result = result[keys[i]];
  }
  return result;
}

export function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a === 'function' && typeof b === 'function') return true;
  if (a == null || typeof a != "object"
   || b == null || typeof b != "object") {
    return false;
  }
  for (var prop in b) {
    if (prop !== 'children' && (!(prop in a) || !deepEqual(a[prop], b[prop]))) return false;
  }
  return true;
}

export const flat = arr => [].concat(...arr);

export function getOSName() {
  let OSName = 'Unknown';
  if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) OSName = 'Windows 10';
  if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) OSName = 'Windows 8';
  if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) OSName = 'Windows 7';
  if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) OSName = 'Windows Vista';
  if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) OSName = 'Windows XP';
  if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) OSName = 'Windows 2000';
  if (window.navigator.userAgent.indexOf('Mac') !== -1) OSName = 'Mac/iOS';
  if (window.navigator.userAgent.indexOf('X11') !== -1) OSName = 'UNIX';
  if (window.navigator.userAgent.indexOf('Linux') !== -1) OSName = 'Linux';

  return OSName;
}

export function getBrowser() {
  let browser_name = '';
  let isIE = /*@cc_on!@*/ false || !!document.documentMode;
  let isEdge = !isIE && !!window.StyleMedia;
  if (navigator.userAgent.indexOf('Chrome') !== -1 && !isEdge) {
    browser_name = 'Chrome';
  } else if (navigator.userAgent.indexOf('Safari') !== -1 && !isEdge) {
    browser_name = 'Safari';
  } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
    browser_name = 'Firefox';
  } else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
    //IF IE > 10
    browser_name = 'IE';
  } else if (isEdge) {
    browser_name = 'Edge';
  } else {
    browser_name = 'Unknown';
  }

  return browser_name;
}

export function stringToBoolean(string) {
  switch (string.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(string);
  }
}
