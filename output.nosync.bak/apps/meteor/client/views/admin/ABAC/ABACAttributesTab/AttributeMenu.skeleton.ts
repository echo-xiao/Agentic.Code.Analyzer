## File: apps/meteor/client/views/admin/ABAC/ABACAttributesTab/AttributeMenu.tsx

```typescript
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useAttributeOptions } from '../hooks/useAttributeOptions';

export type AttributeMenuProps = {
	attribute: { _id: string; key: string };
};

const AttributeMenu = ({ attribute }: AttributeMenuProps) => {
    /* Implementation Hidden */
};

export default AttributeMenu;

```