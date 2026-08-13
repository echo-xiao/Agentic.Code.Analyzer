## File: apps/meteor/client/views/admin/customEmoji/CustomEmojiRoute.tsx

```typescript
import { Button } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarClose,
	ContextualbarDialog,
	ContextualbarTitle,
	Page,
	PageHeader,
	PageContent,
} from '@rocket.chat/ui-client';
import { useRoute, useRouteParameter, usePermission } from '@rocket.chat/ui-contexts';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import AddCustomEmoji from './AddCustomEmoji';
import CustomEmoji from './CustomEmoji';
import EditCustomEmojiWithData from './EditCustomEmojiWithData';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const CustomEmojiRoute = () => {
    /* Implementation Hidden */
};

export default CustomEmojiRoute;

```