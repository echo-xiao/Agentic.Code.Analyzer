## File: apps/meteor/app/meteor-accounts-saml/server/lib/settings.ts

```typescript
import type { SAMLConfiguration } from '@rocket.chat/core-typings';
import { LoginServiceConfiguration } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { SAMLUtils } from './Utils';
import {
	defaultAuthnContextTemplate,
	defaultAuthRequestTemplate,
	defaultLogoutResponseTemplate,
	defaultLogoutRequestTemplate,
	defaultNameIDTemplate,
	defaultIdentifierFormat,
	defaultAuthnContext,
	defaultMetadataTemplate,
	defaultMetadataCertificateTemplate,
} from './constants';
import { SystemLogger } from '../../../../server/lib/logger/system';
import {
	notifyOnLoginServiceConfigurationChanged,
	notifyOnLoginServiceConfigurationChangedByService,
} from '../../../lib/server/lib/notifyListener';
import { settings, settingsRegistry } from '../../../settings/server';
import type { IServiceProviderOptions } from '../definition/IServiceProviderOptions';

const getSamlConfigs = function (service: string): SAMLConfiguration {
    /* Implementation Hidden */
};

const isValidConfiguration = function (key: string, samlConfigs: SAMLConfiguration): boolean {
    /* Implementation Hidden */
};

const configureSamlService = function (samlConfigs: Record<string, any>): IServiceProviderOptions {
    /* Implementation Hidden */
};

export const loadSamlServiceProviders = async function (): Promise<void> {
    /* Implementation Hidden */
};

export const addSamlService = function (name: string): void {
    /* Implementation Hidden */
};

export const addSettings = async function (name: string): Promise<void> {
    /* Implementation Hidden */
};

```