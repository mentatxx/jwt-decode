**jwt-decode-es** is a small browser library that helps decoding JWTs token which are Base64Url encoded.
This is a fork of [jwt-decode](https://github.com/auth0/jwt-decode) library which is not really supported.

**IMPORTANT:** This library doesn't validate the token, any well formed JWT can be decoded. You should validate the token in your server-side logic by using something like [express-jwt](https://github.com/auth0/express-jwt), [koa-jwt](https://github.com/stiang/koa-jwt), [Owin Bearer JWT](https://github.com/michaelnoonan/Auth0-Owin-JwtBearerAuthentication), etc.

## Installation

Install with npm `npm i --save jwt-decode-es`

In comparison with `jwt-decode`, it provides ES, UMD and CJS modules and has latest build dependencies
with fixed vulnerbilities. It uses [rollup](https://rollupjs.org/) bundler with terser plugin to minify sources.
Current version is just `1.25 Kb` for minified `.mjs` version.

## Usage

```javascript
import { jwt_decode } from "jwt-decode-es";
const token = "eyJ0eXAiO.../// jwt token";

const decoded = jwt_decode(token);
console.log(decoded);

/* prints:
 * { foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  }
 */

// decode header by passing in options (useful for when you need `kid` to verify a JWT):
const decodedHeader = jwt_decode(token, { header: true });
console.log(decodedHeader);

/* prints:
 * { typ: "JWT",
 *   alg: "HS256" }
 */
```

**Note:** A falsy or malformed token will throw an `InvalidTokenError` error.

## Include with a script tag

Copy the file jwt-decode.min.js from the build/ folder to your project somewhere, then include like so:

```html
<script src="jwt-decode.min.js"></script>

<script>
  var jwt_decode = jwt_decode_es.jwt_decode;
  var token = "eyJ0eXAiO.../// jwt token";
  var decoded = jwt_decode(token);
  console.log(decoded);
</script>
```

## Author

Initial author [Auth0](https://auth0.com)
Updated to modern platform by Alexey Petushkov

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
