## File: apps/meteor/server/api/lib/getUserInfo.ts

```typescript
import { isOAuthUser, type IMeApiUser, type IUser, type IUserEmail, type IUserCalendar } from '@rocket.chat/core-typings';
import semver from 'semver';

import { settings } from '../../../app/settings/server';
import { Info } from '../../../app/utils/rocketchat.info';
import { getURL } from '../../../app/utils/server/getURL';
import { getUserPreference } from '../../../app/utils/server/lib/getUserPreference';

const isVerifiedEmail = (me: IUser): false | IUserEmail | undefined => {
    /* Implementation Hidden */
};

const getUserPreferences = async (me: IUser): Promise<Record<string, unknown>> => {
    /* Implementation Hidden */
};

const filterOutdatedVersionUpdateBanners = (banners: NonNullable<IUser['banners']>): IUser['banners'] => {
    /* Implementation Hidden */
};

/**
 * Returns the user's calendar settings based on their email domain and the configured mapping.
 * If the email is not provided or the domain is not found in the mapping,
 * it returns the default Outlook calendar settings.
 * @param email - The user's email object, which may contain the address and verification status.
 * @returns The calendar settings for the user, including Outlook calendar settings if enabled.
 */
const getUserCalendar = (email: false | IUserEmail | undefined): IUserCalendar => {
    /* Implementation Hidden */
};

export async function getUserInfo(me: IUser, pullPreferences = true): Promise<IMeApiUser> {
    /* Implementation Hidden */
}

```