## File: apps/meteor/ee/server/apps/communication/endpoints/appLogsExportHandler.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { isAppLogsExportProps } from '@rocket.chat/rest-typings';
import { ajv } from '@rocket.chat/rest-typings/src/v1/Ajv';
import { parse } from 'cookie';
import { json2csv } from 'json-2-csv';

import type { AppsRestApi } from '../rest';
import { makeAppLogsQuery } from './lib/makeAppLogsQuery';
import { APIClass } from '../../../../../server/api/ApiClass';
import type { APIActionContext } from '../../../../../server/api/router';

const isErrorResponse = ajv.compile<{
	success: false;
	error: string;
}>({
	type: 'object',
	properties: {
		success: {
			type: 'boolean',
			enum: [false],
		},
		error: {
			type: 'string',
		},
	},
});

class ExportHandlerAPI extends APIClass {
	public override async authenticatedRoute(routeContext: APIActionContext): Promise<IUser | null> {
        /* Implementation Hidden */
    }
}

const adhocApi = new ExportHandlerAPI({
	useDefaultAuth: false,
	prettyJson: process.env.NODE_ENV !== 'development',
});

export const registerAppLogsExportHandler = ({ api, _manager, _orch }: AppsRestApi) => {
    /* Implementation Hidden */
};

```