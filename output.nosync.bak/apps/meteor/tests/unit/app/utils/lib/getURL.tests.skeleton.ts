## File: apps/meteor/tests/unit/app/utils/lib/getURL.tests.js

```typescript
import { expect } from 'chai';
import proxyquire from 'proxyquire';

import { ltrim, rtrim } from '../../../../../lib/utils/stringUtils';

const { _getURL } = proxyquire.noCallThru().load('../../../../../app/utils/lib/getURL', {
	'meteor/meteor': {
		'Meteor': {
			absoluteUrl() {
				return 'http://localhost:3000/';
			},
		},
		'@global': true,
	},
});

const testPaths = (o, _processPath) => {
    /* Implementation Hidden */
};

const getCloudUrl = (_site_url, path) => {
    /* Implementation Hidden */
};

const testCases = (options) => {
    /* Implementation Hidden */
};

const testCasesForOptions = (description, options) => {
    /* Implementation Hidden */
};

describe('getURL', () => {
	testCasesForOptions('getURL with no CDN, no PREFIX for http://localhost:3000/', {
		_cdn_prefix: '',
		_root_url_path_prefix: '',
		_site_url: 'http://localhost:3000/',
	});

	testCasesForOptions('getURL with no CDN, no PREFIX for http://localhost:3000', {
		_cdn_prefix: '',
		_root_url_path_prefix: '',
		_site_url: 'http://localhost:3000',
	});

	testCasesForOptions('getURL with CDN, no PREFIX for http://localhost:3000/', {
		_cdn_prefix: 'https://cdn.com',
		_root_url_path_prefix: '',
		_site_url: 'http://localhost:3000/',
	});

	testCasesForOptions('getURL with CDN, PREFIX for http://localhost:3000/', {
		_cdn_prefix: 'https://cdn.com',
		_root_url_path_prefix: 'sub',
		_site_url: 'http://localhost:3000/',
	});

	testCasesForOptions('getURL with CDN, PREFIX for https://localhost:3000/', {
		_cdn_prefix: 'https://cdn.com',
		_root_url_path_prefix: 'sub',
		_site_url: 'https://localhost:3000/',
	});
});

```