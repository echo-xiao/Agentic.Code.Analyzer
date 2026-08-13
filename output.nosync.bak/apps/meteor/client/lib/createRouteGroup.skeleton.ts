## File: apps/meteor/client/lib/createRouteGroup.tsx

```typescript
import type { IRouterPaths, RouteName, RouterPathPattern } from '@rocket.chat/ui-contexts';
import type { ElementType, ReactNode } from 'react';

import { appLayout } from './appLayout';
import { router } from '../providers/RouterProvider';
import MainLayout from '../views/root/MainLayout';

type GroupName = 'omnichannel' | 'marketplace' | 'account' | 'admin';

type GroupPrefix<TGroupName extends GroupName> = IRouterPaths[`${TGroupName}-index`]['pattern'];

type RouteNamesOf<TGroupName extends GroupName> = (
	| keyof {
			[TRouteName in RouteName as IRouterPaths[TRouteName]['pattern'] extends `${GroupPrefix<TGroupName>}/${string}`
				? TRouteName
				: never]: never;
	  }
	| `${GroupName}-index`
) &
	RouteName;

type TrimPrefix<T, P extends string> = T extends `${P}${infer U}` ? U : T;

export const createRouteGroup = <TGroupName extends GroupName>(
	name: TGroupName,
	prefix: NoInfer<GroupPrefix<TGroupName>>,
	RouterComponent: ElementType<{
		children?: ReactNode;
	}>,
) => {
    /* Implementation Hidden */
};

```