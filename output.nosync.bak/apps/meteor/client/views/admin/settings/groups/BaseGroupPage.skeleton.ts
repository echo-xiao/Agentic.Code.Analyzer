## File: apps/meteor/client/views/admin/settings/groups/BaseGroupPage.tsx

```typescript
import type { ReactNode } from 'react';

import GenericGroupPage from './GenericGroupPage';
import TabbedGroupPage from './TabbedGroupPage';
import { useEditableSettingsGroupSections, useEditableSettingsGroupTabs } from '../../EditableSettingsContext';

export type BaseGroupPageProps = {
	_id: string;
	i18nLabel: string;
	headerButtons?: ReactNode;
	hasReset?: boolean;
	onClickBack?: () => void;
};
const BaseGroupPage = ({ _id, i18nLabel, headerButtons, hasReset, onClickBack, ...props }: BaseGroupPageProps) => {
    /* Implementation Hidden */
};

export default BaseGroupPage;

```