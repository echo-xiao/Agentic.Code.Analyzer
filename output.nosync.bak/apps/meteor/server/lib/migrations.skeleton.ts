## File: apps/meteor/server/lib/migrations.ts

```typescript
import type { IControl } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { Migrations } from '@rocket.chat/models';

import { showErrorBox } from './logger/showBox';
import { Info } from '../../app/utils/rocketchat.info';
import { sleep } from '../../lib/utils/sleep';

type IMigration = {
	name?: string;
	version: number;
	up: (migration: IMigration) => Promise<void> | void;
	down?: (migration: IMigration) => Promise<void> | void;
};

const log = new Logger('Migrations');

const migrations = new Set<IMigration>();

// sets the control record
async function setControl(control: Pick<IControl, 'version' | 'locked'>): Promise<Pick<IControl, 'version' | 'locked'>> {
    /* Implementation Hidden */
}

// gets the current control record, optionally creating it if non-existant
export async function getControl(): Promise<IControl> {
    /* Implementation Hidden */
}

// Returns true if lock was acquired.
async function lock(): Promise<boolean> {
    /* Implementation Hidden */
}

export function addMigration(migration: IMigration): void {
    /* Implementation Hidden */
}

// Side effect: saves version.
async function unlock(version: number): Promise<void> {
    /* Implementation Hidden */
}

function getOrderedMigrations(): IMigration[] {
    /* Implementation Hidden */
}

function showError(version: number, control: IControl, e: any): void {
    /* Implementation Hidden */
}

// run the actual migration
async function migrate(direction: 'up' | 'down', migration: IMigration): Promise<void> {
    /* Implementation Hidden */
}

const maxAttempts = 30;
const retryInterval = 10;
let currentAttempt = 0;

export async function migrateDatabase(targetVersion: 'latest' | number, subcommands?: string[]): Promise<boolean> {
    /* Implementation Hidden */
}

export async function onServerVersionChange(cb: () => Promise<void>): Promise<void> {
    /* Implementation Hidden */
}

```