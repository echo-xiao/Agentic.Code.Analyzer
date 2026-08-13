## File: apps/meteor/client/router/page.ts

```typescript
import type { Key } from 'path-to-regexp';
import { pathToRegexp } from 'path-to-regexp';

type State = { readonly path: string };

export class Context {
	canonicalPath: string;

	path: string;

	querystring: string;

	pathname: string;

	state: State;

	title: string;

	params: Record<string, string>;

	constructor(page: Page, path: string, state?: State) {
        /* Implementation Hidden */
    }

	pushState() {
        /* Implementation Hidden */
    }

	save() {
        /* Implementation Hidden */
    }
}

class Route {
	private readonly regexp: RegExp;

	private readonly keys: Key[] = [];

	constructor(
		path: string,
		private readonly fn: (ctx: Context) => void,
	) {
        /* Implementation Hidden */
    }

	match(path: string, params: Record<string, string>): boolean {
        /* Implementation Hidden */
    }

	readonly callback = (ctx: Context, next: () => void) => {
		if (this.match(ctx.path, ctx.params)) {
			this.fn(ctx);
			return;
		}
		next();
	};
}

export class Page {
	routes: Route[] = [];

	current = '';

	private running: boolean;

	registerRoute(path: string, callback: (ctx: Context) => void): void {
        /* Implementation Hidden */
    }

	clearRoutes() {
        /* Implementation Hidden */
    }

	start() {
        /* Implementation Hidden */
    }

	stop() {
        /* Implementation Hidden */
    }

	private readonly onclick = (e: MouseEvent) => {
		if (e.button !== 0) return;

		if (e.metaKey || e.ctrlKey || e.shiftKey) return;
		if (e.defaultPrevented) return;

		const el = (e.target as Element | null)?.closest<HTMLAnchorElement | SVGAElement>('a');
		if (!el) return;

		if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

		const isSVGAElement = (e: HTMLAnchorElement | SVGAElement): e is SVGAElement => typeof e.href === 'object';

		const link = isSVGAElement(el) ? el.href.baseVal : el.href;
		const url = new URL(link, location.toString());
		if (url.pathname === location.pathname && url.search === location.search && (url.hash || link === '#')) return;

		if (url.protocol === 'mailto:') return;

		if (isSVGAElement(el) ? el.target.baseVal : el.target) return;

		if (!isSVGAElement(el) && (location.protocol !== url.protocol || location.hostname !== url.hostname || location.port !== url.port))
			return;

		let path = isSVGAElement(el) ? el.href.baseVal : el.pathname + el.search + (el.hash || '');

		path = path[0] !== '/' ? `/${path}` : path;

		const orig = path;
		const pageBase = this.getBase();

		if (path.indexOf(pageBase) === 0) {
			path = path.slice(this.getBase().length);
		}

		if (pageBase && orig === path) return;

		e.preventDefault();
		this.show(orig);
	};

	private readonly onpopstate = (e: PopStateEvent) => {
		if (e.state) {
			this.replace(e.state.path, { state: e.state });
		} else {
			this.show(location.pathname + location.hash, { push: false });
		}
	};

	show(
		this: this,
		path: string,
		{ state, dispatch = true, push = true, reload = false }: { state?: State; dispatch?: boolean; push?: boolean; reload?: boolean } = {},
	) {
        /* Implementation Hidden */
    }

	replace(this: this, path: string, { state, dispatch = true }: { state?: State; dispatch?: boolean } = {}) {
        /* Implementation Hidden */
    }

	dispatch(ctx: Context) {
        /* Implementation Hidden */
    }

	private unhandled(ctx: Context) {
        /* Implementation Hidden */
    }

	private base = '';

	getBase() {
        /* Implementation Hidden */
    }

	setBase(path: string) {
        /* Implementation Hidden */
    }

	readonly Context = Context;
}

function decodeURLEncodedURIComponent(val: string): string {
    /* Implementation Hidden */
}

```