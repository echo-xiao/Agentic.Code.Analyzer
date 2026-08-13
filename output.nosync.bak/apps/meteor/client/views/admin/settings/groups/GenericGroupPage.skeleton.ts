## File: apps/meteor/client/views/admin/settings/groups/GenericGroupPage.tsx

```typescript
import type { ReactNode } from 'react';
import { memo } from 'react';

import SettingsGroupPage from '../SettingsGroupPage';
import Section from '../SettingsSection';

export type GenericGroupPageProps = {
	_id: string;
	i18nLabel: string;
	tabs?: ReactNode;
	currentTab?: string;
	hasReset?: boolean;
	sections: string[];
	headerButtons?: ReactNode;
	onClickBack?: () => void;
};

function GenericGroupPage({ _id, i18nLabel, sections, tabs, currentTab, hasReset, onClickBack, ...props }: GenericGroupPageProps) {
    /* Implementation Hidden */
}

export default memo(GenericGroupPage);

```