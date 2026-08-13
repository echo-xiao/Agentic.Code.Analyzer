## File: apps/meteor/packages/meteor-cookies/cookies.js

```typescript
import { Meteor } from 'meteor/meteor';

let fetch;
let WebApp;

if (Meteor.isServer) {
	WebApp = require('meteor/webapp').WebApp;
} else {
	fetch = require('meteor/fetch').fetch;
}

const NoOp = () => {
    /* Implementation Hidden */
};
const urlRE = /\/___cookie___\/set/;
const rootUrl = Meteor.isServer
	? process.env.ROOT_URL
	: window.__meteor_runtime_config__.ROOT_URL || window.__meteor_runtime_config__.meteorEnv.ROOT_URL || false;
const mobileRootUrl = Meteor.isServer
	? process.env.MOBILE_ROOT_URL
	: window.__meteor_runtime_config__.MOBILE_ROOT_URL || window.__meteor_runtime_config__.meteorEnv.MOBILE_ROOT_URL || false;

const helpers = {
	isUndefined(obj) {
		return obj === void 0;
	},
	isArray(obj) {
		return Array.isArray(obj);
	},
	clone(obj) {
		if (!this.isObject(obj)) return obj;
		return this.isArray(obj) ? obj.slice() : Object.assign({}, obj);
	},
};
const _helpers = ['Number', 'Object', 'Function'];
for (let i = 0; i < _helpers.length; i++) {
	helpers['is' + _helpers[i]] = function (obj) {
		return Object.prototype.toString.call(obj) === '[object ' + _helpers[i] + ']';
	};
}

/**
 * @url https://github.com/jshttp/cookie/blob/master/index.js
 * @name cookie
 * @author jshttp
 * @license
 * (The MIT License)
 *
 * Copyright (c) 2012-2014 Roman Shtylman <shtylman@gmail.com>
 * Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const decode = decodeURIComponent;
const encode = encodeURIComponent;
const pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * @function
 * @name tryDecode
 * @param {String} str
 * @param {Function} d
 * @summary Try decoding a string using a decoding function.
 * @private
 */
const tryDecode = (str, d) => {
    /* Implementation Hidden */
};

/**
 * @function
 * @name parse
 * @param {String} str
 * @param {Object} [options]
 * @return {Object}
 * @summary
 * Parse a cookie header.
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 * @private
 */
const parse = (str, options) => {
    /* Implementation Hidden */
};

/**
 * @function
 * @name antiCircular
 * @param data {Object} - Circular or any other object which needs to be non-circular
 * @private
 */
const antiCircular = (_obj) => {
    /* Implementation Hidden */
};

/**
 * @function
 * @name serialize
 * @param {String} name
 * @param {String} val
 * @param {Object} [options]
 * @return { cookieString: String, sanitizedValue: Mixed }
 * @summary
 * Serialize data into a cookie header.
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 * serialize('foo', 'bar', { httpOnly: true }) => "foo=bar; httpOnly"
 * @private
 */
const serialize = (key, val, opt = {}) => {
    /* Implementation Hidden */
};

const isStringifiedRegEx = /JSON\.parse\((.*)\)/;
const isTypedRegEx = /false|true|null/;
const deserialize = (string) => {
    /* Implementation Hidden */
};

/**
 * @locus Anywhere
 * @class __cookies
 * @param opts {Object} - Options (configuration) object
 * @param opts._cookies {Object|String} - Current cookies as String or Object
 * @param opts.TTL {Number|Boolean} - Default cookies expiration time (max-age) in milliseconds, by default - session (false)
 * @param opts.runOnServer {Boolean} - Expose Cookies class to Server
 * @param opts.response {http.ServerResponse|Object} - This object is created internally by a HTTP server
 * @param opts.allowQueryStringCookies {Boolean} - Allow passing Cookies in a query string (in URL). Primary should be used only in Cordova environment
 * @param opts.allowedCordovaOrigins {Regex|Boolean} - [Server] Allow setting Cookies from that specific origin which in Meteor/Cordova is localhost:12XXX (^http://localhost:12[0-9]{3}$)
 * @summary Internal Class
 */
class __cookies {
	constructor(opts) {
        /* Implementation Hidden */
    }

	/**
	 * @locus Anywhere
	 * @memberOf __cookies
	 * @name get
	 * @param {String} key  - The name of the cookie to read
	 * @param {String} _tmp - Unparsed string instead of user's cookies
	 * @summary Read a cookie. If the cookie doesn't exist a null value will be returned.
	 * @returns {String|void}
	 */
	get(key, _tmp) {
        /* Implementation Hidden */
    }

	/**
	 * @locus Anywhere
	 * @memberOf __cookies
	 * @name set
	 * @param {String} key   - The name of the cookie to create/overwrite
	 * @param {String} value - The value of the cookie
	 * @param {Object} opts  - [Optional] Cookie options (see readme docs)
	 * @summary Create/overwrite a cookie.
	 * @returns {Boolean}
	 */
	set(key, value, opts = {}) {
        /* Implementation Hidden */
    }

	/**
	 * @locus Anywhere
	 * @memberOf __cookies
	 * @name remove
	 * @param {String} key    - The name of the cookie to create/overwrite
	 * @param {String} path   - [Optional] The path from where the cookie will be
	 * readable. E.g., "/", "/mydir"; if not specified, defaults to the current
	 * path of the current document location (string or null). The path must be
	 * absolute (see RFC 2965). For more information on how to use relative paths
	 * in this argument, see: https://developer.mozilla.org/en-US/docs/Web/API/document.cookie#Using_relative_URLs_in_the_path_parameter
	 * @param {String} domain - [Optional] The domain from where the cookie will
	 * be readable. E.g., "example.com", ".example.com" (includes all subdomains)
	 * or "subdomain.example.com"; if not specified, defaults to the host portion
	 * of the current document location (string or null).
	 * @summary Remove a cookie(s).
	 * @returns {Boolean}
	 */
	remove(key, path = '/', domain = '') {
        /* Implementation Hidden */
    }

	/**
	 * @locus Anywhere
	 * @memberOf __cookies
	 * @name has
	 * @param {String} key  - The name of the cookie to create/overwrite
	 * @param {String} _tmp - Unparsed string instead of user's cookies
	 * @summary Check whether a cookie exists in the current position.
	 * @returns {Boolean}
	 */
	has(key, _tmp) {
        /* Implementation Hidden */
    }

	/**
	 * @locus Anywhere
	 * @memberOf __cookies
	 * @name keys
	 * @summary Returns an array of all readable cookies from this location.
	 * @returns {[String]}
	 */
	keys() {
        /* Implementation Hidden */
    }

	/**
	 * @locus Client
	 * @memberOf __cookies
	 * @name send
	 * @param cb {Function} - Callback
	 * @summary Send all cookies over XHR to server.
	 * @returns {void}
	 */
	send(cb = NoOp) {
        /* Implementation Hidden */
    }
}

/**
 * @function
 * @locus Server
 * @summary Middleware handler
 * @private
 */
const __middlewareHandler = (request, response, opts) => {
    /* Implementation Hidden */
};

/**
 * @locus Anywhere
 * @class Cookies
 * @param opts {Object}
 * @param opts.TTL {Number} - Default cookies expiration time (max-age) in milliseconds, by default - session (false)
 * @param opts.auto {Boolean} - [Server] Auto-bind in middleware as `req.Cookies`, by default `true`
 * @param opts.handler {Function} - [Server] Middleware handler
 * @param opts.runOnServer {Boolean} - Expose Cookies class to Server
 * @param opts.allowQueryStringCookies {Boolean} - Allow passing Cookies in a query string (in URL). Primary should be used only in Cordova environment
 * @param opts.allowedCordovaOrigins {Regex|Boolean} - [Server] Allow setting Cookies from that specific origin which in Meteor/Cordova is localhost:12XXX (^http://localhost:12[0-9]{3}$)
 * @summary Main Cookie class
 */
class Cookies extends __cookies {
	constructor(opts = {}) {
        /* Implementation Hidden */
    }

	/**
	 * @locus Server
	 * @memberOf Cookies
	 * @name middleware
	 * @summary Get Cookies instance into callback
	 * @returns {void}
	 */
	middleware() {
        /* Implementation Hidden */
    }
}

if (Meteor.isServer) {
	Cookies.isLoadedOnServer = false;
}

/* Export the Cookies class */
export { Cookies };

```