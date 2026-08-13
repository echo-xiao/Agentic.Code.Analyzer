## File: apps/meteor/app/authentication/server/startup/index.js

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import { User } from '@rocket.chat/core-services';
import { Roles, Settings, Users } from '@rocket.chat/models';
import { escapeRegExp, escapeHTML } from '@rocket.chat/string-helpers';
import { getLoginExpirationInDays, removeEmpty } from '@rocket.chat/tools';
import { Accounts } from 'meteor/accounts-base';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { parseCSV } from '../../../../lib/utils/parseCSV';
import { safeHtmlDots } from '../../../../lib/utils/safeHtmlDots';
import { callbacks } from '../../../../server/lib/callbacks';
import { beforeCreateUserCallback } from '../../../../server/lib/callbacks/beforeCreateUserCallback';
import { getClientAddress } from '../../../../server/lib/getClientAddress';
import { getMaxLoginTokens } from '../../../../server/lib/getMaxLoginTokens';
import { i18n } from '../../../../server/lib/i18n';
import { addUserRolesAsync } from '../../../../server/lib/roles/addUserRoles';
import { joinDefaultChannels } from '../../../../server/lib/rooms/joinDefaultChannels';
import { getAvatarSuggestionForUser } from '../../../../server/lib/users/getAvatarSuggestionForUser';
import { setAvatarFromServiceWithValidation } from '../../../../server/lib/users/setUserAvatar';
import { getNewUserRoles } from '../../../../server/services/user/lib/getNewUserRoles';
import { notifyOnSettingChangedById } from '../../../lib/server/lib/notifyListener';
import * as Mailer from '../../../mailer/server/api';
import { settings } from '../../../settings/server';
import { getBaseUserFields } from '../../../utils/server/functions/getBaseUserFields';
import { isValidAttemptByUser, isValidLoginAttemptByIp } from '../lib/restrictLoginAttempts';

Accounts.config({
	forbidClientAccountCreation: true,
});
/**
 * Accounts calls `_initServerPublications` and holds the `_defaultPublishFields`, without Object.assign its not possible
 * to extend the projection
 *
 * the idea is to send all required fields to the client during login
 * we tried `defaultFieldsSelector` , but it changes all Meteor.userAsync projections which is undesirable
 *
 *
 * we are removing the status here because meteor send 'offline'
 */
Object.assign(Accounts._defaultPublishFields.projection, (({ status, ...rest }) => rest)(getBaseUserFields(true)));

// Override Meteor's _expireTokens to ensure the correct login expiration is used.
// If loginExpirationInDays is not set (e.g., startup was disrupted before settings watcher fired),
// read the setting directly from MongoDB before proceeding with token cleanup.
// This prevents tokens from being incorrectly deleted using Meteor's 90-day default.
const { _expireTokens } = Accounts;
Accounts._expireTokens = async function (oldestValidDate, userId) {
	if (!Accounts._options.loginExpirationInDays) {
		const loginExpiration = await Settings.getValueById('Accounts_LoginExpiration');
		Accounts._options.loginExpirationInDays = getLoginExpirationInDays(loginExpiration);
	}
	return _expireTokens.call(Accounts, oldestValidDate, userId);
};

Meteor.startup(() => {
	settings.watchMultiple(['Accounts_LoginExpiration', 'Site_Name', 'From_Email'], () => {
		Accounts._options.loginExpirationInDays = getLoginExpirationInDays(settings.get('Accounts_LoginExpiration'));

		Accounts.emailTemplates.siteName = settings.get('Site_Name');

		Accounts.emailTemplates.from = `${settings.get('Site_Name')} <${settings.get('From_Email')}>`;
	});
});

Accounts.emailTemplates.userToActivate = {
	subject() {
		const subject = i18n.t('Accounts_Admin_Email_Approval_Needed_Subject_Default');
		const siteName = settings.get('Site_Name');

		return `[${siteName}] ${subject}`;
	},

	html(options = {}) {
		const email = options.reason
			? 'Accounts_Admin_Email_Approval_Needed_With_Reason_Default'
			: 'Accounts_Admin_Email_Approval_Needed_Default';

		return Mailer.replace(i18n.t(email), {
			name: escapeHTML(options.name),
			email: escapeHTML(options.email),
			reason: escapeHTML(options.reason),
		});
	},
};

Accounts.emailTemplates.userActivated = {
	subject({ active, username }) {
		const activated = username ? 'Activated' : 'Approved';
		const action = active ? activated : 'Deactivated';
		const subject = `Accounts_Email_${action}_Subject`;
		const siteName = settings.get('Site_Name');

		return `[${siteName}] ${i18n.t(subject)}`;
	},

	html({ active, name, username }) {
		const activated = username ? 'Activated' : 'Approved';
		const action = active ? activated : 'Deactivated';

		return Mailer.replace(i18n.t(`Accounts_Email_${action}`), {
			name: escapeHTML(name),
		});
	},
};

let verifyEmailTemplate = '';
let enrollAccountTemplate = '';
let resetPasswordTemplate = '';
Meteor.startup(() => {
	Mailer.getTemplateWrapped('Verification_Email', (value) => {
		verifyEmailTemplate = value;
	});
	Mailer.getTemplateWrapped('Accounts_Enrollment_Email', (value) => {
		enrollAccountTemplate = value;
	});
	Mailer.getTemplateWrapped('Forgot_Password_Email', (value) => {
		resetPasswordTemplate = value;
	});
});

Accounts.emailTemplates.verifyEmail.html = function (userModel, url) {
	const name = safeHtmlDots(userModel.name);

	return Mailer.replace(verifyEmailTemplate, { Verification_Url: url, name });
};

Accounts.emailTemplates.verifyEmail.subject = function () {
	const subject = settings.get('Verification_Email_Subject');
	return Mailer.replace(subject || '');
};

Accounts.urls.resetPassword = function (token) {
	return Meteor.absoluteUrl(`reset-password/${token}`);
};

Accounts.emailTemplates.resetPassword.subject = function (userModel) {
	return Mailer.replace(settings.get('Forgot_Password_Email_Subject') || '', {
		name: userModel.name,
	});
};

Accounts.emailTemplates.resetPassword.html = function (userModel, url) {
	return Mailer.replacekey(
		Mailer.replace(resetPasswordTemplate, {
			name: userModel.name,
		}),
		'Forgot_Password_Url',
		url,
	);
};

Accounts.emailTemplates.enrollAccount.subject = function (user) {
	const subject = settings.get('Accounts_Enrollment_Email_Subject');
	return Mailer.replace(subject, user);
};

Accounts.emailTemplates.enrollAccount.html = function (user = {} /* , url*/) {
	return Mailer.replace(enrollAccountTemplate, {
		name: escapeHTML(user.name),
		email: user.emails && user.emails[0] && escapeHTML(user.emails[0].address),
	});
};

const getLinkedInName = ({ firstName, lastName }) => {
    /* Implementation Hidden */
};

const validateEmailDomain = (user) => {
    /* Implementation Hidden */
};

const onCreateUserAsync = async function (options, user = {}) {
    /* Implementation Hidden */
};

Accounts.onCreateUser(function (...args) {
	// Depends on meteor support for Async
	return onCreateUserAsync.call(this, ...args);
});

const { insertUserDoc } = Accounts;

Accounts.insertUserDoc = async function (options, user) {
	const globalRoles = new Set();

	if (Match.test(options.globalRoles, [String]) && options.globalRoles.length > 0) {
		options.globalRoles.map((role) => globalRoles.add(role));
	}

	if (Match.test(user.globalRoles, [String]) && user.globalRoles.length > 0) {
		user.globalRoles.map((role) => globalRoles.add(role));
	}

	delete user.globalRoles;

	// for some reason, the name is not being set in the user object but is being set in the options object
	if (options.name && typeof options.name === 'string') {
		user.name = options.name;
	}

	if (user.services && !user.services.password && !options.skipAuthServiceDefaultRoles) {
		const defaultAuthServiceRoles = parseCSV(settings.get('Accounts_Registration_AuthenticationServices_Default_Roles') || '');

		if (defaultAuthServiceRoles.length > 0) {
			defaultAuthServiceRoles.map((role) => globalRoles.add(role));
		}
	}

	const arrayGlobalRoles = [...globalRoles];
	const roles = options.skipNewUserRolesSetting ? arrayGlobalRoles : getNewUserRoles(arrayGlobalRoles);

	if (!user.type) {
		user.type = 'user';
	}

	if (
		settings.get('Accounts_TwoFactorAuthentication_Enabled') &&
		settings.get('Accounts_TwoFactorAuthentication_By_Email_Enabled') &&
		settings.get('Accounts_TwoFactorAuthentication_By_Email_Auto_Opt_In')
	) {
		user.services = user.services || {};
		user.services.email2fa = {
			enabled: true,
			changedAt: new Date(),
		};
	}

	// Make sure that the user has the field 'roles'
	if (!user.roles) {
		user.roles = [];
	}

	const _id = await insertUserDoc.call(Accounts, options, user);

	user = await Users.findOne({
		_id,
	});

	/**
	 * if settings shows setup wizard to be pending
	 * and no admin's been found,
	 * and existing role list doesn't include admin
	 * create this user admin.
	 * count this as the completion of setup wizard step 1.
	 */
	if (!options.skipAdminCheck) {
		const hasAdmin = await Users.findOneByRolesAndType('admin', 'user', { projection: { _id: 1 } });
		if (!roles.includes('admin') && !hasAdmin) {
			roles.push('admin');
			if (settings.get('Show_Setup_Wizard') === 'pending') {
				// TODO: audit
				(await Settings.updateValueById('Show_Setup_Wizard', 'in_progress')).modifiedCount &&
					void notifyOnSettingChangedById('Show_Setup_Wizard');
			}
		}
	}

	await addUserRolesAsync(_id, roles);

	// Make user's roles to be present on callback
	user = await Users.findOneById(_id, { projection: { username: 1, type: 1, roles: 1 } });

	if (user.username) {
		if (options.joinDefaultChannels !== false) {
			await joinDefaultChannels(_id, options.joinDefaultChannelsSilenced);
		}

		if (!options.skipAfterCreateUserCallback && user.type !== 'visitor') {
			setImmediate(() => {
				return callbacks.run('afterCreateUser', user);
			});
		}
		if (!options.skipDefaultAvatar && settings.get('Accounts_SetDefaultAvatar') === true) {
			const avatarSuggestions = await getAvatarSuggestionForUser(user);
			for (const service of Object.keys(avatarSuggestions)) {
				const avatarData = avatarSuggestions[service];
				if (service !== 'gravatar') {
					await setAvatarFromServiceWithValidation(_id, avatarData.blob, '', service);
					break;
				}
			}
		}
	}

	if (!options.skipAppsEngineEvent) {
		// `post` triggered events don't need to wait for the promise to resolve
		Apps.self?.triggerEvent(AppEvents.IPostUserCreated, { user, performedBy: options.performedBy }).catch((e) => {
			Apps.self?.getRocketChatLogger().error({ msg: 'Error while executing post user created event', err: e });
		});
	}

	return _id;
};

const validateLoginAttemptAsync = async function (login) {
    /* Implementation Hidden */
};

Accounts.validateLoginAttempt(function (...args) {
	// Depends on meteor support for Async
	return validateLoginAttemptAsync.call(this, ...args);
});

Accounts.validateNewUser((user) => {
	if (user.type === 'visitor') {
		return true;
	}

	if (
		settings.get('Accounts_Registration_AuthenticationServices_Enabled') === false &&
		settings.get('LDAP_Enable') === false &&
		!(user.services && user.services.password)
	) {
		throw new Meteor.Error('registration-disabled-authentication-services', 'User registration is disabled for authentication services');
	}

	return true;
});

Accounts.validateNewUser((user) => {
	if (user.type === 'visitor') {
		return true;
	}

	let domainWhiteList = settings.get('Accounts_AllowedDomainsList');
	if (_.isEmpty(domainWhiteList?.trim())) {
		return true;
	}

	domainWhiteList = domainWhiteList.split(',').map((domain) => domain.trim());

	if (user.emails && user.emails.length > 0) {
		const email = user.emails[0].address;
		const inWhiteList = domainWhiteList.some((domain) => email.match(`@${escapeRegExp(domain)}$`));

		if (inWhiteList === false) {
			throw new Meteor.Error('error-invalid-domain');
		}
	}

	return true;
});

Accounts.onLogin(async ({ user }) => {
	if (!user || !user.services || !user.services.resume || !user.services.resume.loginTokens || !user._id) {
		return;
	}

	if (user.services.resume.loginTokens.length < getMaxLoginTokens()) {
		return;
	}

	await User.ensureLoginTokensLimit(user._id);
});

```