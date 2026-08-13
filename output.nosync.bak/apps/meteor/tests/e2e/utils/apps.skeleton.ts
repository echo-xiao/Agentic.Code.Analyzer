## File: apps/meteor/tests/e2e/utils/apps.ts

```typescript
import fs from 'fs';

import { request } from '@playwright/test';
import type { Endpoints } from '@rocket.chat/rest-typings';

import { expect, type BaseTest } from './test';
import { APP_URL } from '../../data/apps/apps-data';
import { BASE_API_URL, BASE_URL } from '../config/constants';
import { Users } from '../fixtures/userStates';

export async function insertDefaultTestApp(): Promise<void> {
    /* Implementation Hidden */
}

export async function installLocalTestPackage(packagePath: string): Promise<{ app: { id: string } }> {
    /* Implementation Hidden */
}

export async function uninstallApp(appId: string): Promise<void> {
    /* Implementation Hidden */
}

export async function getAppLogs(api: BaseTest['api'], appId: string): Promise<ReturnType<Endpoints['/apps/:id/logs']['GET']>> {
    /* Implementation Hidden */
}

```