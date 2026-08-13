## File: apps/meteor/client/views/admin/customUserStatus/CustomUserStatusRoute.tsx

```typescript
import { Button, ButtonGroup } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarClose,
	ContextualbarTitle,
	ContextualbarDialog,
	Page,
	PageHeader,
	PageContent,
} from '@rocket.chat/ui-client';
import { useRoute, useRouteParameter, usePermission, useTranslation, useSetting } from '@rocket.chat/ui-contexts';
import { useCallback, useRef, useEffect } from 'react';

import CustomUserActiveConnections from './CustomUserActiveConnections';
import CustomUserStatusFormWithData from './CustomUserStatusFormWithData';
import CustomUserStatusService from './CustomUserStatusService';
import CustomUserStatusTable from './CustomUserStatusTable';
import { useIsEnterprise } from '../../../hooks/useIsEnterprise';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const CustomUserStatusRoute = () => {
    /* Implementation Hidden */
};

export default CustomUserStatusRoute;

```