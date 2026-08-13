## File: apps/meteor/tests/mocks/client/RouterContextMock.tsx

```typescript
import type { To, SearchParameters, LocationPathname, LocationSearch } from '@rocket.chat/ui-contexts';
import { RouterContext } from '@rocket.chat/ui-contexts';
import { compile } from 'path-to-regexp';
import { useRef, useMemo } from 'react';
import type { MutableRefObject, ReactNode } from 'react';

const encodeSearchParameters = (searchParameters: SearchParameters) => {
    /* Implementation Hidden */
};

const buildRoutePath = (to: To): LocationPathname | `${LocationPathname}?${LocationSearch}` => {
    /* Implementation Hidden */
};

type RouterContextMockProps = {
	children?: ReactNode;
	navigate?: (toOrDelta: number | To) => void;
	currentPath?: MutableRefObject<string | undefined>;
	searchParameters?: Record<string, any>;
	routeParameters?: Record<string, any>;
};

const RouterContextMock = ({ children, navigate, currentPath, searchParameters = {}, routeParameters = {} }: RouterContextMockProps) => {
    /* Implementation Hidden */
};

export default RouterContextMock;

```