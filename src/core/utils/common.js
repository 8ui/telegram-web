import pako from 'pako';

const parseStickerData = async(blob) => {
  const r = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const result = pako.inflate(e.target.result, { to: 'string' });
        resolve(JSON.parse(result));
      } catch (err) {
        reject({ key, error: true, msg: err.toString() });
      }
    };
    reader.readAsArrayBuffer(blob);
  })

  return r;
}

function getOSName() {
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

function getBrowser() {
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

function stringToBoolean(string) {
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

export {
  getBrowser,
  getOSName,
  stringToBoolean,
  parseStickerData,
};
