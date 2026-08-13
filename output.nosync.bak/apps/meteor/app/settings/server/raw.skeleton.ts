## File: apps/meteor/app/settings/server/raw.ts

```typescript
import type { SettingValue } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';

const cache = new Map();

export const setValue = (_id: string, value: SettingValue) => cache.set(_id, value);

const setFromDB = async (_id: string) => {
    /* Implementation Hidden */
};

export const getValue = async (_id: string) => {
    /* Implementation Hidden */
};

export const updateValue = <T extends { value: SettingValue }>(id: string, fields: T) => {
    /* Implementation Hidden */
};

```