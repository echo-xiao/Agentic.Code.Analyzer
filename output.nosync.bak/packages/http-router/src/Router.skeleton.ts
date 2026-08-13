## File: packages/http-router/src/Router.ts

```typescript
import { Logger } from '@rocket.chat/logger';
import type { Method } from '@rocket.chat/rest-typings';
import type { AnySchema } from 'ajv';
import express from 'express';
import type { Context, HonoRequest, MiddlewareHandler } from 'hono';
import { Hono } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';

import type { ResponseSchema, TypedOptions } from './definition';
import { honoAdapterForExpress } from './middlewares/honoAdapterForExpress';
import { parseQueryParams } from './parseQueryParams';

const logger = new Logger('HttpRouter');

type MiddlewareHandlerListAndActionHandler<TOptions extends TypedOptions, TContext = (c: Context) => Promise<ResponseSchema<TOptions>>> = [
	...MiddlewareHandler[],
	TContext,
];

function splitArray<T, U>(arr: [...T[], U]): [T[], U] {
    /* Implementation Hidden */
}

function coerceDatesToStrings(obj: unknown): unknown {
    /* Implementation Hidden */
}

export type Route = {
	responses: Record<
		number,
		{
			description: string;
			content: {
				'application/json': {
					schema: AnySchema;
				};
			};
		}
	>;
	parameters?: {
		schema: AnySchema;
		in: 'query';
		name: 'query';
		required: true;
	}[];
	requestBody?: {
		required: true;
		content: {
			'application/json': {
				schema: AnySchema;
			};
		};
	};
	security?: {
		userId: [];
		authToken: [];
	}[];
	tags?: string[];
};

export abstract class AbstractRouter<TActionCallback = (c: Context) => Promise<ResponseSchema<TypedOptions>>> {
	protected abstract convertActionToHandler(action: TActionCallback, logger: Logger): (c: Context) => Promise<ResponseSchema<TypedOptions>>;
}

type InnerRouter = Hono<{
	Variables: {
		remoteAddress: string;
		bodyParams: Record<string, unknown>;
		queryParams: Record<string, unknown>;
	};
}>;

export class Router<
	TBasePath extends string,
	TOperations extends {
		[x: string]: unknown;
	} = NonNullable<unknown>,
	TActionCallback = (c: Context) => Promise<ResponseSchema<TypedOptions>>,
> extends AbstractRouter<TActionCallback> {
	protected innerRouter: InnerRouter;

	constructor(readonly base: TBasePath) {
        /* Implementation Hidden */
    }

	public typedRoutes: Record<string, Record<string, Route>> = {};

	protected registerTypedRoutes<
		TSubPathPattern extends string,
		TOptions extends TypedOptions,
		TPathPattern extends `${TBasePath}/${TSubPathPattern}`,
	>(method: Method, subpath: TSubPathPattern, options: TOptions): void {
        /* Implementation Hidden */
    }

	protected async parseBodyParams({ request }: { request: HonoRequest }): Promise<NonNullable<unknown>> {
        /* Implementation Hidden */
    }

	protected parseQueryParams(request: HonoRequest) {
        /* Implementation Hidden */
    }

	protected method<TSubPathPattern extends string, TOptions extends TypedOptions>(
		method: Method,
		subpath: TSubPathPattern,
		options: TOptions,
		...actions: MiddlewareHandlerListAndActionHandler<TOptions, TActionCallback>
	): Router<TBasePath, TOperations, TActionCallback> {
        /* Implementation Hidden */
    }

	protected convertActionToHandler(action: TActionCallback, _logger: Logger): (c: Context) => Promise<ResponseSchema<TypedOptions>> {
        /* Implementation Hidden */
    }

	get<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		subpath: TSubPathPattern,
		options: TOptions,
		...action: MiddlewareHandlerListAndActionHandler<TOptions, TActionCallback>
	): Router<
		TBasePath,
		| TOperations
		| ({
				method: 'GET';
				path: TPathPattern;
		  } & Omit<TOptions, 'response'>),
		TActionCallback
	> {
        /* Implementation Hidden */
    }

	post<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		subpath: TSubPathPattern,
		options: TOptions,
		...action: MiddlewareHandlerListAndActionHandler<TOptions, TActionCallback>
	): Router<
		TBasePath,
		| TOperations
		| ({
				method: 'POST';
				path: TPathPattern;
		  } & Omit<TOptions, 'response'>),
		TActionCallback
	> {
        /* Implementation Hidden */
    }

	put<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		subpath: TSubPathPattern,
		options: TOptions,
		...action: MiddlewareHandlerListAndActionHandler<TOptions, TActionCallback>
	): Router<
		TBasePath,
		| TOperations
		| ({
				method: 'PUT';
				path: TPathPattern;
		  } & Omit<TOptions, 'response'>),
		TActionCallback
	> {
        /* Implementation Hidden */
    }

	delete<TSubPathPattern extends string, TOptions extends TypedOptions, TPathPattern extends `${TBasePath}/${TSubPathPattern}`>(
		subpath: TSubPathPattern,
		options: TOptions,
		...action: MiddlewareHandlerListAndActionHandler<TOptions, TActionCallback>
	): Router<
		TBasePath,
		| TOperations
		| ({
				method: 'DELETE';
				path: TPathPattern;
		  } & Omit<TOptions, 'response'>),
		TActionCallback
	> {
        /* Implementation Hidden */
    }

	use<FN extends MiddlewareHandler>(fn: FN): Router<TBasePath, TOperations, TActionCallback>;

	use<IRouter extends Router<any, any, any>>(
		innerRouter: IRouter,
	): IRouter extends Router<any, infer IOperations, any>
		? Router<TBasePath, ConcatPathOptions<TBasePath, IOperations, TOperations>, TActionCallback>
		: never;

	use(innerRouter: unknown): any {
        /* Implementation Hidden */
    }

	get router(): express.Router {
		// eslint-disable-next-line new-cap
		const router = express.Router();
		const hono = new Hono();
		router.use(
			this.base,
			honoAdapterForExpress(
				hono.route(this.base, this.innerRouter).options('*', (c) => {
					return c.body('OK');
				}),
			),
		);
		return router;
	}

	getHonoRouter(): InnerRouter {
        /* Implementation Hidden */
    }
}

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

type ConcatPathOptions<
	TPath extends string,
	TOptions extends {
		[x: string]: unknown;
	},
	TOther extends {
		[x: string]: unknown;
	},
> = Prettify<
	Filter<
		{
			[x in keyof TOptions]: x extends 'path' ? (TOptions[x] extends string ? `${TPath}${TOptions[x]}` : never) : TOptions[x];
		} & TOther
	>
>;

type Filter<
	TOther extends {
		[x: string]: unknown;
	},
> = TOther extends { method: Method; path: string } ? TOther : never;

export type ExtractRouterEndpoints<TRoute extends Router<any, any, any>> =
	TRoute extends Router<any, infer TOperations, any> ? TOperations : never;

```