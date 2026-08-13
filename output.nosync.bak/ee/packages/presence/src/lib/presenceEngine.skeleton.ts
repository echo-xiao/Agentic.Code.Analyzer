## File: ee/packages/presence/src/lib/presenceEngine.ts

```typescript
import type { IUser, IUserSessionConnection } from '@rocket.chat/core-typings';
import { UserStatus } from '@rocket.chat/core-typings';

export type ClaimUpdate =
	| { type: 'setActive'; newState: Pick<IUser, 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId'> }
	| { type: 'endActive'; statusId?: string }
	| { type: 'clearActive' };

// Priority: internal > manual > external (lower number = higher priority).
// System states (like auto-away) are not listed here and have the lowest priority.
const PRIORITY = { internal: 1, manual: 2, external: 3 };
const NO_PRIORITY = 4;

const RESET_TO_ONLINE = {
	set: { statusDefault: UserStatus.ONLINE, statusText: '' },
	unset: ['statusSource', 'statusExpiresAt', 'previousState', 'statusId'],
};

function isExpired(expiresAt?: Date): boolean {
    /* Implementation Hidden */
}

function fieldsToUnset(state: Pick<IUser, 'statusExpiresAt'>, extra?: string[]): string[] {
    /* Implementation Hidden */
}

/** Reduces multiple DDP sessions into one status: ONLINE wins,
 * then first non-OFFLINE. */
function reduceConnections(current: UserStatus, status: UserStatus): UserStatus {
    /* Implementation Hidden */
}

/**
 * Resolves final display status: OFFLINE connection always wins,
 * explicit claims (busy/away) override connection, ONLINE defers to connection.
 */
function computeStatus(statusConnection: UserStatus, statusDefault: UserStatus): UserStatus {
    /* Implementation Hidden */
}

function disconnectedStatus(claimType: ClaimUpdate['type'], isServiceUser: boolean, statusDefault: UserStatus): UserStatus {
    /* Implementation Hidden */
}

/**
 * Resolves a claim update against the user's current state using the priority system.
 * Returns the DB fields to set/unset, or null if the claim is rejected.
 */
function resolveIntent(
	user: Pick<IUser, 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId' | 'previousState'>,
	claimUpdate: ClaimUpdate,
): { set: Record<string, unknown> & { statusDefault?: UserStatus }; unset: string[] } | null {
    /* Implementation Hidden */
}

/**
 * Computes the final presence state for a user by combining claim intent with connection reality.
 * Returns the DB fields to $set and optionally $unset.
 */
export function processPresence(
	user: Pick<IUser, 'type' | 'roles' | 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId' | 'previousState'>,
	sessions: IUserSessionConnection[],
	claimUpdate?: ClaimUpdate,
): { values: Record<string, unknown>; clear?: string[] } {
    /* Implementation Hidden */
}

```