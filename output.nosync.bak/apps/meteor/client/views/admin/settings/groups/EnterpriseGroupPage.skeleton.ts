## File: apps/meteor/client/views/admin/settings/groups/EnterpriseGroupPage.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import { Trans } from 'react-i18next';

import SettingsGroupPage from '../SettingsGroupPage';

type EnterpriseGroupPageProps = {
	_id: string;
	i18nLabel: string;
	currentTab?: string;
	hasReset?: boolean;
	onClickBack?: () => void;
};

const useRedirectToRouteLink = (onClick: (event: MouseEvent<HTMLAnchorElement>) => void) => {
    /* Implementation Hidden */
};

const EnterpriseGroupPage = ({ _id, i18nLabel, onClickBack, ...props }: EnterpriseGroupPageProps) => {
    /* Implementation Hidden */
};

export default EnterpriseGroupPage;

```