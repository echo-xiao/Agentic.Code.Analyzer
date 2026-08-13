## File: apps/meteor/client/views/room/hooks/useRetentionPolicy.ts

```typescript
import type { IRoom, IRoomWithRetentionPolicy } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';

import { TIMEUNIT, isValidTimespan, timeUnitToMs } from '../../../lib/convertTimeUnit';

const hasRetentionPolicy = (room: IRoom & { retention?: any }): room is IRoomWithRetentionPolicy =>
	'retention' in room && room.retention !== undefined;

const isRetentionOverridden = (room: IRoom & { retention?: any }) => 'overrideGlobal' in room.retention && room.retention.overrideGlobal;

type RetentionPolicySettings = {
	enabled: boolean;
	filesOnly: boolean;
	doNotPrunePinned: boolean;
	ignoreThreads: boolean;
	appliesToChannels: boolean;
	maxAgeChannels: number;
	appliesToGroups: boolean;
	maxAgeGroups: number;
	appliesToDMs: boolean;
	maxAgeDMs: number;
};

const isActive = (room: IRoom, { enabled, appliesToChannels, appliesToGroups, appliesToDMs }: RetentionPolicySettings): boolean => {
    /* Implementation Hidden */
};

const extractFilesOnly = (room: IRoom, { filesOnly }: RetentionPolicySettings): boolean => {
    /* Implementation Hidden */
};

const extractExcludePinned = (room: IRoom, { doNotPrunePinned }: RetentionPolicySettings): boolean => {
    /* Implementation Hidden */
};

const extractIgnoreThreads = (room: IRoom, { ignoreThreads }: RetentionPolicySettings): boolean => {
    /* Implementation Hidden */
};

const getMaxAge = (room: IRoom, { maxAgeChannels, maxAgeGroups, maxAgeDMs }: RetentionPolicySettings): number => {
    /* Implementation Hidden */
};

export type RetentionPolicy = {
	enabled: boolean;
	isActive: boolean;
	filesOnly: boolean;
	excludePinned: boolean;
	ignoreThreads: boolean;
	maxAge: number;
};

export const useRetentionPolicy = (room: IRoom | undefined): RetentionPolicy | undefined => {
    /* Implementation Hidden */
};

```