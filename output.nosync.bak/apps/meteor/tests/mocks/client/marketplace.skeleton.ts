## File: apps/meteor/tests/mocks/client/marketplace.tsx

```typescript
import { AppClientManager } from '@rocket.chat/apps/dist/client/AppClientManager';
import { AppsEngineUIHost } from '@rocket.chat/apps/dist/client/AppsEngineUIHost';
import type { IExternalComponentRoomInfo } from '@rocket.chat/apps/dist/client/definition/IExternalComponentRoomInfo';
import type { ReactNode } from 'react';

import { AppsContext, type IAppsOrchestrator } from '../../../client/contexts/AppsContext';
import { createFakeExternalComponentRoomInfo, createFakeExternalComponentUserInfo } from '../data';

class MockedAppsEngineUIHost extends AppsEngineUIHost {
	public async getClientRoomInfo(): Promise<IExternalComponentRoomInfo> {
        /* Implementation Hidden */
    }

	public async getClientUserInfo() {
        /* Implementation Hidden */
    }
}

class MockedAppClientManager extends AppClientManager {}

export const mockAppsOrchestrator = () => {
    /* Implementation Hidden */
};

export const mockedAppsContext = (children: ReactNode) => (
	<AppsContext.Provider value={mockAppsOrchestrator()}>{children}</AppsContext.Provider>
);

```