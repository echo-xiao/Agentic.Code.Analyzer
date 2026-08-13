## File: apps/meteor/client/views/marketplace/hooks/useInstallApp.tsx

```typescript
import type { App, AppPermission } from '@rocket.chat/core-typings';
import { useRouter, useSetModal, useUpload } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { useAppsReload } from './useAppsReload';
import { AppClientOrchestratorInstance } from '../../../apps/orchestrator';
import { useIsEnterprise } from '../../../hooks/useIsEnterprise';
import AppExemptModal from '../AppExemptModal';
import AppPermissionsReviewModal from '../AppPermissionsReviewModal';
import AppUpdateModal from '../AppUpdateModal';
import { useAppsCountQuery } from './useAppsCountQuery';
import { handleAPIError } from '../helpers/handleAPIError';
import { handleInstallError } from '../helpers/handleInstallError';
import { getManifestFromZippedApp } from '../lib/getManifestFromZippedApp';

export const useInstallApp = (file: File): { install: () => void; isInstalling: boolean } => {
    /* Implementation Hidden */
};

```