## File: packages/apps/base-runtime/src/lib/accessors/extenders/HttpExtender.ts

```typescript
import type { IHttpExtend, IHttpPreRequestHandler, IHttpPreResponseHandler } from '@rocket.chat/apps-engine/definition/accessors/IHttp';

export class HttpExtend implements IHttpExtend {
	private headers: Map<string, string>;

	private params: Map<string, string>;

	private requests: Array<IHttpPreRequestHandler>;

	private responses: Array<IHttpPreResponseHandler>;

	constructor() {
        /* Implementation Hidden */
    }

	public provideDefaultHeader(key: string, value: string): void {
        /* Implementation Hidden */
    }

	public provideDefaultHeaders(headers: { [key: string]: string }): void {
        /* Implementation Hidden */
    }

	public provideDefaultParam(key: string, value: string): void {
        /* Implementation Hidden */
    }

	public provideDefaultParams(params: { [key: string]: string }): void {
        /* Implementation Hidden */
    }

	public providePreRequestHandler(handler: IHttpPreRequestHandler): void {
        /* Implementation Hidden */
    }

	public providePreResponseHandler(handler: IHttpPreResponseHandler): void {
        /* Implementation Hidden */
    }

	public getDefaultHeaders(): Map<string, string> {
        /* Implementation Hidden */
    }

	public getDefaultParams(): Map<string, string> {
        /* Implementation Hidden */
    }

	public getPreRequestHandlers(): Array<IHttpPreRequestHandler> {
        /* Implementation Hidden */
    }

	public getPreResponseHandlers(): Array<IHttpPreResponseHandler> {
        /* Implementation Hidden */
    }
}

```