## File: packages/apps-engine/src/definition/api/ApiEndpoint.ts

```typescript
import type { IApp } from '../IApp';
import { HttpStatusCode } from '../accessors';
import type { IApiEndpoint } from './IApiEndpoint';
import type { IApiResponse, IApiResponseJSON } from './IResponse';

/** Represents an api endpoint that is being provided. */
export abstract class ApiEndpoint implements IApiEndpoint {
	/**
	 * The last part of the api URL. Example: https://{your-server-address}/api/apps/public/{your-app-id}/{path}
	 * or https://{your-server-address}/api/apps/private/{your-app-id}/{private-hash}/{path}
	 */
	public path: string;

	constructor(public app: IApp) {
        /* Implementation Hidden */
    }

	/**
	 * Return response with status 200 (OK) and a optional content
	 * @param content
	 */
	protected success(content?: any): IApiResponse {
        /* Implementation Hidden */
    }

	/**
	 * Return a json response adding Content Type header as
	 * application/json if not already provided
	 * @param reponse
	 */
	protected json(response: IApiResponseJSON): IApiResponse {
        /* Implementation Hidden */
    }
}

```