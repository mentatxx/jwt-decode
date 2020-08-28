function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = "InvalidTokenError";

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = "InvalidCharacterError";

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 * and slightly modified by enthusiasts
 */

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * atob polyfill, if window.atob is not available
 * @param {string} input
 */
function polyfill(input) {
  const str = String(input).replace(/=+$/, "");
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  }
  for (
    // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = "";
    // get next character
    (buffer = str.charAt(idx++));
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer &&
    ((bs = bc % 4 ? bs * 64 + buffer : buffer),
    // and if not first of each 4 characters,
    // convert the first 8 bits to one ascii character
    bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
}

var atob = (typeof window !== "undefined" &&
  window.atob &&
  window.atob.bind(window)) ||
  polyfill;

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

function base64_url_decode (str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}

function jwt_decode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified");
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split(".")[pos]));
  } catch (e) {
    throw new InvalidTokenError("Invalid token specified: " + e.message);
  }
}

export { InvalidCharacterError, InvalidTokenError, jwt_decode };
//# sourceMappingURL=jwt-decode.mjs.map
