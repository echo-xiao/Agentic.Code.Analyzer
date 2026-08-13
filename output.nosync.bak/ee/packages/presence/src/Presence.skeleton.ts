## File: ee/packages/presence/src/Presence.ts

```typescript
import { setTimeout, clearTimeout } from 'node:timers';

import type { IPresence, IBrokerNode } from '@rocket.chat/core-services';
import { License, ServiceClass, Settings } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import { UserStatus } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { Users, UsersSessions } from '@rocket.chat/models';

import { PresenceReaper } from './lib/PresenceReaper';
import { normalizeStatusText } from './lib/normalizeStatusText';
import { type ClaimUpdate, processPresence } from './lib/presenceEngine';

const logger = new Logger('Presence');

const MAX_CONNECTIONS = 200;
const MAX_TIMEOUT_DELAY_MS = 2 ** 31 - 1;

type PresenceUser = Pick<
	IUser,
	| '_id'
	| 'username'
	| 'type'
	| 'roles'
	| 'status'
	| 'statusDefault'
	| 'statusSource'
	| 'statusText'
	| 'statusExpiresAt'
	| 'statusConnection'
	| 'statusId'
	| 'previousState'
>;

export class Presence extends ServiceClass implements IPresence {
	protected name = 'presence';

	private broadcastEnabled = true;

	private hasPresenceLicense = false;

	private hasScalabilityLicense = false;

	private hasLicense = false;

	private lostConTimeout?: NodeJS.Timeout;

	private connsPerInstance = new Map<string, number>();

	private peakConnections = 0;

	private reaper: PresenceReaper;

	private expirationTimeout?: NodeJS.Timeout;

	private expirationScheduleToken?: symbol;

	constructor() {
        /* Implementation Hidden */
    }

	async onNodeDisconnected({ node }: { node: IBrokerNode }): Promise<void> {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }

	private async processExpiredStatuses(): Promise<void> {
        /* Implementation Hidden */
    }

	private async setupNextExpiration(): Promise<void> {
        /* Implementation Hidden */
    }

	private async handleExpirationJob(): Promise<void> {
        /* Implementation Hidden */
    }

	private async handleReaperUpdates(userIds: string[]): Promise<void> {
        /* Implementation Hidden */
    }

	override async stopped(): Promise<void> {
        /* Implementation Hidden */
    }

	async toggleBroadcast(enabled: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	getConnectionCount(): { current: number; max: number } {
        /* Implementation Hidden */
    }

	async newConnection(
		uid: string | undefined,
		session: string | undefined,
		nodeId: string,
	): Promise<{ uid: string; connectionId: string } | undefined> {
        /* Implementation Hidden */
    }

	async updateConnection(uid: string, connectionId: string): Promise<{ uid: string; connectionId: string } | undefined> {
        /* Implementation Hidden */
    }

	async removeConnection(uid: string | undefined, session: string | undefined): Promise<{ uid: string; session: string } | undefined> {
        /* Implementation Hidden */
    }

	async removeLostConnections(nodeID?: string): Promise<string[]> {
        /* Implementation Hidden */
    }

	/**
	 * Updates presence and reschedules the expiration job.
	 * All public methods should use this instead of calling updateUserPresence directly.
	 */
	private async updatePresenceAndReschedule(uid: string, claimUpdate: ClaimUpdate): Promise<boolean> {
        /* Implementation Hidden */
    }

	async setStatus(userId: string, statusDefault: UserStatus, statusText?: string, statusExpiresAt?: Date): Promise<boolean> {
        /* Implementation Hidden */
    }

	/**
	 * Applies a presence claim from a source (manual, external, internal).
	 */
	async setActiveState(
		userId: string,
		newState: Pick<IUser, 'statusDefault' | 'statusSource' | 'statusText' | 'statusExpiresAt' | 'statusId'>,
	): Promise<boolean> {
        /* Implementation Hidden */
    }

	/**
	 * Ends a presence claim. With `statusId`, only that claim is affected (so concurrent voice/video
	 * claims end in either order); without it, the displaced claim is restored.
	 */
	async endActiveState(userId: string, statusId?: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	/**
	 * Removes all presence claims and resets to "Online" with no text.
	 */
	async clearActiveState(userId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async setConnectionStatus(uid: string, status: UserStatus, session: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	/**
	 * Low-level presence update. Does not reschedule the expiration job.
	 * Prefer {@link updatePresenceAndReschedule} for public-facing methods.
	 */
	private async updateUserPresence(uidOrUser: string | PresenceUser, claimUpdate?: ClaimUpdate): Promise<boolean> {
        /* Implementation Hidden */
    }

	private broadcast(
		user: Pick<IUser, '_id' | 'username' | 'status' | 'statusText' | 'statusSource' | 'statusExpiresAt' | 'roles'>,
		previousStatus: UserStatus | undefined,
	): void {
        /* Implementation Hidden */
    }

	private async validateAvailability(): Promise<void> {
        /* Implementation Hidden */
    }

	private getTotalConnections(): number {
        /* Implementation Hidden */
    }

	getPeakConnections(reset = false): number {
        /* Implementation Hidden */
    }

	resetPeakConnections(): void {
        /* Implementation Hidden */
    }
}

```