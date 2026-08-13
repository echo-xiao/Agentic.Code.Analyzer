## File: apps/meteor/app/utils/lib/getURL.ts

```typescript
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { isAbsoluteURL } from '@rocket.chat/tools';

import { ltrim, rtrim, trim } from '../../../lib/utils/stringUtils';

function getCloudUrl(
	path: string,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	_site_url: string,
	cloudRoute: string,
	cloudParams: Record<string, string> = {},
	deeplinkUrl = '',
): string {
    /* Implementation Hidden */
}

export const _getURL = (
	path: string,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	{ cdn, full, cloud, cloud_route, cloud_params, _cdn_prefix, _root_url_path_prefix, _site_url }: Record<string, any>,
	deeplinkUrl?: string,
): string => {
    /* Implementation Hidden */
};

export const getURLWithoutSettings = (
	path: string,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	{
		cdn = true,
		full = false,
		cloud = false,
		cloud_route = '',
		cloud_params = {},
	}: {
		cdn?: boolean;
		full?: boolean;
		cloud?: boolean;
		cloud_route?: string;
		cloud_params?: Record<string, string>;
	},
	cdnPrefix: string,
	siteUrl: string,
	cloudDeepLinkUrl?: string,
): string =>
	_getURL(
		path,
		{
			cdn,
			full,
			cloud,
			cloud_route,
			cloud_params,
			_cdn_prefix: cdnPrefix,
			_root_url_path_prefix: __meteor_runtime_config__.ROOT_URL_PATH_PREFIX,
			_site_url: siteUrl,
		},
		cloudDeepLinkUrl,
	);

```