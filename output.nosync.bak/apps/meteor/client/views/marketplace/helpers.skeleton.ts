## File: apps/meteor/client/views/marketplace/helpers.ts

```typescript
import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { App } from '@rocket.chat/core-typings';
import semver from 'semver';

// import { t } from '../../../app/utils/client';
import { appErroredStatuses } from './helpers/appErroredStatuses';
import { t } from '../../../app/utils/lib/i18n';

export const appEnabledStatuses = [AppStatus.AUTO_ENABLED, AppStatus.MANUALLY_ENABLED];

export type Actions = 'update' | 'install' | 'purchase' | 'request';

type appButtonResponseProps = {
	action: Actions;
	icon?: 'reload' | 'warning';
	label: 'Update' | 'Install' | 'Subscribe' | 'See_Pricing' | 'Try_now' | 'Buy' | 'Request' | 'Requested';
};

export type appStatusSpanResponseProps = {
	type?: 'primary' | 'failed' | 'warning' | 'danger';
	icon?: 'warning' | 'checkmark-circled' | 'check';
	label:
		| 'Config_needed'
		| 'Failed'
		| 'Disabled'
		| 'Disabled*'
		| 'Trial_period'
		| 'Enabled'
		| 'Enabled*'
		| 'Incompatible'
		| 'request'
		| 'requests'
		| 'Requested'
		| 'Mixed_status';
	tooltipText?: string;
};

type appButtonPropsType = App & { isAdminUser: boolean; endUserRequested: boolean };

export const appButtonProps = ({
	installed,
	version,
	marketplaceVersion,
	isPurchased,
	price,
	purchaseType,
	subscriptionInfo,
	pricingPlans,
	isEnterpriseOnly,
	versionIncompatible,
	isAdminUser,
	// TODO: Unify this two variables
	requestedEndUser,
	endUserRequested,
}: appButtonPropsType): appButtonResponseProps | undefined => {
    /* Implementation Hidden */
};

export const appIncompatibleStatusProps = (): appStatusSpanResponseProps => ({
	icon: 'check',
	label: 'Incompatible',
	tooltipText: t('App_version_incompatible_tooltip'),
});

export const appStatusSpanProps = (
	{ installed, status, subscriptionInfo, appRequestStats, migrated, clusterStatus }: App,
	isEnterprise?: boolean,
	context?: string,
	isAppDetailsPage?: boolean,
): appStatusSpanResponseProps | undefined => {
    /* Implementation Hidden */
};

export const appMultiStatusProps = (
	app: App,
	isAppDetailsPage: boolean,
	context: string,
	isEnterprise: boolean,
): appStatusSpanResponseProps[] => {
    /* Implementation Hidden */
};

```