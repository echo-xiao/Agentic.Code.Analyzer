## File: apps/meteor/server/api/lib/parseJsonQuery.ts

```typescript
import ejson from 'ejson';
import { Meteor } from 'meteor/meteor';

import { clean } from './cleanQuery';
import { isValidQuery } from './isValidQuery';
import { apiDeprecationLogger } from '../../../app/lib/server/lib/deprecationWarningLogger';
import { isPlainObject } from '../../../lib/utils/isPlainObject';
import { hasPermissionAsync } from '../../lib/authorization/hasPermission';
import { API } from '../api';
import type { GenericRouteExecutionContext } from '../definition';

const pathAllowConf = {
	'/api/v1/users.list': ['$or', '$regex', '$and'],
	'def': ['$or', '$and', '$regex'],
};

export async function parseJsonQuery(api: GenericRouteExecutionContext): Promise<{
	sort: Record<string, 1 | -1>;
	/**
	 * @deprecated To access "fields" parameter, use ALLOW_UNSAFE_QUERY_AND_FIELDS_API_PARAMS environment variable.
	 */
	fields: Record<string, 0 | 1>;
	/**
	 * @deprecated To access "query" parameter, use ALLOW_UNSAFE_QUERY_AND_FIELDS_API_PARAMS environment variable.
	 */
	query: Record<string, unknown>;
}> {
    /* Implementation Hidden */
}

```