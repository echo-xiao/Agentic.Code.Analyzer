## File: packages/ui-client/src/hooks/useGoToDirectMessage.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { usePermission, useUserSubscriptionByName, useRouter } from '@rocket.chat/ui-contexts';

// TODO: Routes type definitions are declared in-file for most places, so this route doesn't exist in this package
declare module '@rocket.chat/ui-contexts' {
	export interface IRouterPaths {
		direct: {
			pathname: `/direct/:rid${`/${string}` | ''}${`/${string}` | ''}`;
			pattern: '/direct/:rid/:tab?/:context?';
		};
	}
}

/**
 * Hook to navigate to a direct message room
 * @param targetUser - Object containing the username of the user to navigate to
 * @param openRoomId - Optional ID of the room that is already open
 * @returns A function to navigate to the direct message room, or undefined if the room is already open or the user doesn't have permission to create direct messages and doesn't have a subscription to the target user
 */
export const useGoToDirectMessage = (targetUser: { username?: string }, openRoomId?: string): (() => void) | undefined => {
    /* Implementation Hidden */
};

```