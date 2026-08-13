## File: apps/meteor/client/views/admin/settings/groups/TabbedGroupPage.tsx

```typescript
import { Tabs, TabsItem } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { memo, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import GenericGroupPage from './GenericGroupPage';
import { useEditableSettingsGroupSections } from '../../EditableSettingsContext';

export type TabbedGroupPageProps = {
	headerButtons?: ReactNode;
	_id: string;
	i18nLabel: string;
	tabs: string[];
	onClickBack?: () => void;
};

function TabbedGroupPage({ _id, tabs, i18nLabel, onClickBack, ...props }: TabbedGroupPageProps) {
    /* Implementation Hidden */
}

export default memo(TabbedGroupPage);

```