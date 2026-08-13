## File: packages/apps-engine/src/definition/api/IResponse.ts

```typescript
import type { HttpStatusCode } from '../accessors';

export interface IApiResponse {
	status: HttpStatusCode;
	headers?: { [key: string]: string };
	content?: any;
}

export interface IApiResponseJSON {
	status: HttpStatusCode;
	headers?: { [key: string]: string };
	content?: { [key: string]: any };
}

```