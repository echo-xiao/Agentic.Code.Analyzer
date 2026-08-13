## File: apps/meteor/app/custom-oauth/server/custom_oauth_server.js

```typescript
import { LDAP } from '@rocket.chat/core-services';
import { Logger } from '@rocket.chat/logger';
import { Users } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { isAbsoluteURL } from '@rocket.chat/tools';
import { Accounts } from 'meteor/accounts-base';
import { Match, check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { OAuth } from 'meteor/oauth';
import { ServiceConfiguration } from 'meteor/service-configuration';
import _ from 'underscore';

import { normalizers, fromTemplate, renameInvalidProperties } from './transform_helpers';
import { client } from '../../../server/database/utils';
import { callbacks } from '../../../server/lib/callbacks';
import { saveUserIdentity } from '../../../server/lib/users/saveUserIdentity';
import { notifyOnUserChange } from '../../lib/server/lib/notifyListener';
import { registerAccessTokenService } from '../../lib/server/oauth/oauth';
import { settings } from '../../settings/server';

const logger = new Logger('CustomOAuth');

const Services = {};
const BeforeUpdateOrCreateUserFromExternalService = [];

export class CustomOAuth {
	constructor(name, options) {
        /* Implementation Hidden */
    }

	configure(options) {
        /* Implementation Hidden */
    }

	async getAccessToken(query) {
        /* Implementation Hidden */
    }

	async getIdentity(accessToken) {
        /* Implementation Hidden */
    }

	registerService() {
        /* Implementation Hidden */
    }

	async normalizeIdentity(identity, accessToken) {
        /* Implementation Hidden */
    }

	async getEmailFromPath(accessToken) {
        /* Implementation Hidden */
    }

	retrieveCredential(credentialToken, credentialSecret) {
        /* Implementation Hidden */
    }

	getUsername(data) {
        /* Implementation Hidden */
    }

	getEmail(data) {
        /* Implementation Hidden */
    }

	getCustomName(data) {
        /* Implementation Hidden */
    }

	getAvatarUrl(data) {
        /* Implementation Hidden */
    }

	getName(identity) {
        /* Implementation Hidden */
    }

	addHookToProcessUser() {
        /* Implementation Hidden */
    }

	registerAccessTokenService(name) {
        /* Implementation Hidden */
    }
}

const { updateOrCreateUserFromExternalService } = Accounts;

Accounts.updateOrCreateUserFromExternalService = async function (...args /* serviceName, serviceData, options*/) {
	for (const hook of BeforeUpdateOrCreateUserFromExternalService) {
		await hook.apply(this, args);
	}

	const [serviceName, serviceData] = args;

	const user = await updateOrCreateUserFromExternalService.apply(this, args);
	if (!user.userId) {
		return undefined;
	}

	const fullUser = await Users.findOneById(user.userId);
	if (settings.get('LDAP_Update_Data_On_OAuth_Login')) {
		await LDAP.loginAuthenticatedUserRequest(fullUser.username);
	}

	await callbacks.run('afterValidateNewOAuthUser', {
		identity: serviceData,
		serviceName,
		user: fullUser,
	});

	return user;
};

```