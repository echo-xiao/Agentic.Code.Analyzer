## File: apps/meteor/app/lib/server/oauth/twitter.js

```typescript
import { Match, check } from 'meteor/check';
import { TwitterApi } from 'twitter-api-v2';
import _ from 'underscore';

import { registerAccessTokenService } from './oauth';

const whitelistedFields = ['id', 'name', 'description', 'profile_image_url', 'profile_image_url_https', 'lang', 'email'];

const getIdentity = async function (accessToken, appId, appSecret, accessTokenSecret) {
    /* Implementation Hidden */
};

registerAccessTokenService('twitter', async (options) => {
	check(
		options,
		Match.ObjectIncluding({
			accessToken: String,
			appSecret: String,
			appId: String,
			accessTokenSecret: String,
			expiresIn: Match.Integer,
		}),
	);

	const identity = await getIdentity(options.accessToken, options.appId, options.appSecret, options.accessTokenSecret);

	const serviceData = {
		accessToken: options.accessToken,
		expiresAt: +new Date() + 1000 * parseInt(options.expiresIn, 10),
	};

	const fields = _.pick(identity, whitelistedFields);
	_.extend(serviceData, fields);

	return {
		serviceData,
		options: {
			profile: {
				name: identity.name,
			},
		},
	};
});

```