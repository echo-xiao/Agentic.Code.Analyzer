## File: apps/meteor/packages/linkedin-oauth/linkedin-server.js

```typescript
import { Accounts } from 'meteor/accounts-base';
import { fetch } from 'meteor/fetch';
import { OAuth } from 'meteor/oauth';
import { ServiceConfiguration } from 'meteor/service-configuration';

export const Linkedin = {};

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
const getTokenResponse = async function (query) {
    /* Implementation Hidden */
};

// Request available fields from profile
const getIdentity = async function (accessToken) {
    /* Implementation Hidden */
};

OAuth.registerService('linkedin', 2, null, async (query) => {
	const response = await getTokenResponse(query);
	const { accessToken } = response;
	const identity = await getIdentity(accessToken);

	const { sub, given_name, family_name, picture, email } = identity;

	if (!sub) {
		throw new Error('Linkedin did not provide an id');
	}

	const fields = {
		linkedinId: sub,
		firstName: given_name,
		lastName: family_name,
		profilePicture: picture,
		emailAddress: email,
		email,
	};

	const serviceData = {
		id: sub,
		accessToken,
		expiresAt: +new Date() + 1000 * response.expiresIn,
		...fields,
	};

	return {
		serviceData,
		options: {
			profile: fields,
		},
	};
});

Linkedin.retrieveCredential = function (credentialToken, credentialSecret) {
	return OAuth.retrieveCredential(credentialToken, credentialSecret);
};

```