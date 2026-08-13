## File: apps/meteor/client/views/marketplace/hooks/useAppInfo.ts

```typescript
import type { App } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useState, useEffect } from 'react';

import { useApps } from './useApps';
import type { ISettings } from '../../../apps/@types/IOrchestrator';
import { AppClientOrchestratorInstance } from '../../../apps/orchestrator';
import type { AppInfo } from '../definitions/AppInfo';

const getBundledInApp = async (app: App): Promise<App['bundledIn']> => {
    /* Implementation Hidden */
};

export const useAppInfo = (appId: string, context: string): AppInfo | undefined => {
    /* Implementation Hidden */
};

```