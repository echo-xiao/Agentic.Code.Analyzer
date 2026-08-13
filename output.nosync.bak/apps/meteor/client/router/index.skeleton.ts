## File: apps/meteor/client/router/index.tsx

```typescript
import type { RoomType, RoomRouteData } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import type {
	LocationHash,
	LocationPathname,
	LocationSearch,
	RouteName,
	RouteObject,
	RouteParameters,
	RouterContextValue,
	SearchParameters,
	To,
} from '@rocket.chat/ui-contexts';

import { Context, Page } from './page';
import { appLayout } from '../lib/appLayout';
import { getRootUrlPathPrefix } from '../lib/meteorRuntimeConfig';
import { roomCoordinator } from '../lib/rooms/roomCoordinator';

export class Router implements RouterContextValue {
	private readonly pathRegExp = /(:[\w\(\)\\\+\*\.\?\[\]\-]+)+/g;

	private readonly queryRegExp = /\?([^\/\r\n].*)/;

	private current:
		| Readonly<{
				path: string;
				params: Map<string, string>;
				route: Route;
				context: Context;
				oldRoute: Route | undefined;
				queryParams: URLSearchParams;
		  }>
		| undefined = undefined;

	private readonly specialChars = ['/', '%', '+'];

	private initialized = false;

	private routes = new Set<Route>();

	private pathDefById = new Map<Route['pathDef'], Route['id']>();

	private readonly basePath = getRootUrlPathPrefix();

	private readonly page = new Page();

	constructor() {
        /* Implementation Hidden */
    }

	private emitter = new Emitter<{ pathChanged: void }>();

	private registerRoute(pathDef: string, options: RouteOptions) {
        /* Implementation Hidden */
    }

	private encodePath(
		idOrPathDef: string,
		params: Record<string, string | null> = {},
		queryParams: Record<string, string | null> = {},
	): string {
        /* Implementation Hidden */
    }

	private encodeParam(param: string) {
        /* Implementation Hidden */
    }

	private initialize() {
        /* Implementation Hidden */
    }

	private refresh() {
        /* Implementation Hidden */
    }

	private updateCallbacks() {
        /* Implementation Hidden */
    }

	// router context implementation

	readonly subscribeToRouteChange = (onRouteChange: () => void): (() => void) => {
		const unsubscribe = this.emitter.on('pathChanged', onRouteChange);

		// FIXME: for some reason this is (and was) necessary to invoke some route actions
		this.emitter.emit('pathChanged');

		return () => {
			unsubscribe();
		};
	};

	readonly getLocationPathname = () => this.current?.path.replace(/\?.*/, '') as LocationPathname;

	readonly getLocationSearch = () => location.search as LocationSearch;

	readonly getLocationHash = () => location.hash as LocationHash;

	readonly getRouteParameters = () => (this.current?.params ? (Object.fromEntries(this.current.params.entries()) as RouteParameters) : {});

	readonly getSearchParameters = () =>
		this.current?.queryParams ? (Object.fromEntries(this.current.queryParams.entries()) as SearchParameters) : {};

	readonly getRouteName = () => this.current?.route?.id as RouteName | undefined;

	readonly getPreviousRouteName = () => this.current?.oldRoute?.id as RouteName | undefined;

	private encodeSearchParameters(searchParameters: SearchParameters) {
        /* Implementation Hidden */
    }

	readonly buildRoutePath = (to: To): LocationPathname | `${LocationPathname}?${LocationSearch}` => {
		if (typeof to === 'string') {
			return to;
		}

		if ('pathname' in to) {
			const { pathname, search = {} } = to;
			return (pathname + this.encodeSearchParameters(search)) as LocationPathname | `${LocationPathname}?${LocationSearch}`;
		}

		if ('pattern' in to) {
			const { pattern, params = {}, search = {} } = to;
			return this.encodePath(pattern, params, search) as LocationPathname | `${LocationPathname}?${LocationSearch}`;
		}

		if ('name' in to) {
			const { name, params = {}, search = {} } = to;
			return this.encodePath(name, params, search) as LocationPathname | `${LocationPathname}?${LocationSearch}`;
		}

		throw new Error('Invalid route');
	};

	readonly navigate = (
		toOrDelta: To | number,
		options?: {
			replace?: boolean;
		},
	) => {
		if (typeof toOrDelta === 'number') {
			history.go(toOrDelta);
			return;
		}

		const path = this.buildRoutePath(toOrDelta);
		const state = { path };

		if (options?.replace) {
			history.replaceState(state, '', path);
		} else {
			history.pushState(state, '', path);
		}

		dispatchEvent(new PopStateEvent('popstate', { state }));
	};

	readonly defineRoutes = (routes: readonly RouteObject[]) => {
		if (!this.initialized) this.initialize();

		const flowRoutes = routes.map((route) =>
			this.registerRoute(route.path, {
				id: route.id,
				action: () => appLayout.render(<>{route.element}</>),
			}),
		);

		if (this.current) this.page.dispatch(new Context(this.page, this.current.path));

		return () => {
			flowRoutes.forEach((flowRoute) => {
				this.routes.delete(flowRoute);
				this.pathDefById.delete(flowRoute.id);
			});

			this.updateCallbacks();
			if (this.current) this.page.dispatch(new Context(this.page, this.current.path));
		};
	};

	readonly getRoomRoute = (roomType: RoomType, routeData: RoomRouteData) => {
		return { path: roomCoordinator.getRouteLink(roomType, routeData) || '/' };
	};
}

type RouteOptions = {
	id: string;
	action?: () => void;
};

class Route {
	readonly action: () => void | Promise<void>;

	readonly id: string;

	constructor(
		public readonly pathDef: string,
		public readonly options: RouteOptions,
	) {
        /* Implementation Hidden */
    }

	actionHandle: (ctx: Context) => void;
}

```