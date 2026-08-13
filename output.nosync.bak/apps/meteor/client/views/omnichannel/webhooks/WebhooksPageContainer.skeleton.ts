## File: apps/meteor/client/views/omnichannel/webhooks/WebhooksPageContainer.tsx

```typescript
import type { ISetting, Serialized, SettingValue } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useEndpoint, usePermission } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import WebhooksPage from './WebhooksPage';
import PageSkeleton from '../../../components/PageSkeleton';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const reduceSettings = (settings: Serialized<ISetting>[]) =>
	settings.reduce<Record<string, SettingValue>>((acc, { _id, value }) => {
		acc = { ...acc, [_id]: value };
		return acc;
	}, {});

const WebhooksPageContainer = () => {
    /* Implementation Hidden */
};

export default WebhooksPageContainer;

```