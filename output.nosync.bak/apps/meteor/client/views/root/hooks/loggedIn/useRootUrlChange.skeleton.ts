## File: apps/meteor/client/views/root/hooks/loggedIn/useRootUrlChange.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRole, useSetModal, useSetting, useSettingSetValue, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import UrlChangeModal from '../../../../components/UrlChangeModal';
import { getRootUrl, getRootUrlPathPrefix } from '../../../../lib/meteorRuntimeConfig';

export const useRootUrlChange = () => {
    /* Implementation Hidden */
};

```