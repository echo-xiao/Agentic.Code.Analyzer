## File: apps/meteor/server/lib/cloud/getWorkspaceAccessToken.ts

```typescript
import type { IWorkspaceCredentials } from '@rocket.chat/core-typings';
import { WorkspaceCredentials } from '@rocket.chat/models';

import { getWorkspaceAccessTokenWithScope } from './getWorkspaceAccessTokenWithScope';
import { retrieveRegistrationStatus } from './retrieveRegistrationStatus';
import { workspaceScopes } from '../../../app/cloud/server/oauthScopes';
import { SystemLogger } from '../logger/system';

const hasWorkspaceAccessTokenExpired = (credentials: IWorkspaceCredentials): boolean => new Date() >= credentials.expirationDate;

/**
 * Returns the access token for the workspace, if it is expired or forceNew is true, it will get a new one
 * and save it to the database, therefore if this function does not throw an error, it will always return a valid token.
 *
 * @param {boolean} forceNew - If true, it will get a new token even if the current one is not expired
 * @param {string} scope - The scope of the token to get
 * @param {boolean} save - If true, it will save the new token to the database
 * @throws {CloudWorkspaceAccessTokenError} If the workspace is not registered (no credentials in the database)
 *
 * @returns string - A valid access token for the workspace
 */
export async function getWorkspaceAccessToken(forceNew = false, scope = '', save = true, throwOnError = false): Promise<string> {
    /* Implementation Hidden */
}

export class CloudWorkspaceAccessTokenError extends Error {
	constructor() {
        /* Implementation Hidden */
    }
}

export const isAbortError = (error: unknown): error is { type: 'AbortError' } => {
    /* Implementation Hidden */
};

export class CloudWorkspaceAccessTokenEmptyError extends Error {
	constructor() {
        /* Implementation Hidden */
    }
}

export async function getWorkspaceAccessTokenOrThrow(forceNew = false, scope = '', save = true): Promise<string> {
    /* Implementation Hidden */
}

export const generateWorkspaceBearerHttpHeaderOrThrow = async (
	forceNew = false,
	scope = '',
	save = true,
): Promise<{ Authorization: string }> => {
    /* Implementation Hidden */
};

export const generateWorkspaceBearerHttpHeader = async (
	forceNew = false,
	scope = '',
	save = true,
): Promise<{ Authorization: string } | undefined> => {
    /* Implementation Hidden */
};

```