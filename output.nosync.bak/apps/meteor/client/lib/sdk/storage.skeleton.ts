## File: apps/meteor/client/lib/sdk/storage.ts

```typescript
// Single point of access to the client-side persistent storage that
// Rocket.Chat shares with Meteor's accounts-base. Reads and writes use
// window.localStorage under the hood; the keys mirror the names Meteor
// originally wrote so sessions persist across the Meteor → SDK migration.

export const STORAGE_KEYS = {
	USER_ID: 'Meteor.userId',
	LOGIN_TOKEN: 'Meteor.loginToken',
	LOGIN_TOKEN_EXPIRES: 'Meteor.loginTokenExpires',
	E2EE_PUBLIC_KEY: 'public_key',
	E2EE_PRIVATE_KEY: 'private_key',
	E2EE_RANDOM_PASSWORD: 'e2e.randomPassword',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

type StorageBackend = 'local' | 'session';

const getStorageForBackend = (backend: StorageBackend): Storage | undefined => {
    /* Implementation Hidden */
};

const getStorage = (): Storage | undefined => {
    /* Implementation Hidden */
};

export const getStoredItem = (key: StorageKey): string | null => getStorage()?.getItem(key) ?? null;

export const setStoredItem = (key: StorageKey, value: string): void => getStorage()?.setItem(key, value);

export const removeStoredItem = (key: StorageKey): void => getStorage()?.removeItem(key);

let storageBackend: StorageBackend = 'local';

export const setStorageBackend = (backend: StorageBackend): boolean => {
    /* Implementation Hidden */
};

const moveLoginKeys = (backend: StorageBackend): boolean => {
    /* Implementation Hidden */
};

```