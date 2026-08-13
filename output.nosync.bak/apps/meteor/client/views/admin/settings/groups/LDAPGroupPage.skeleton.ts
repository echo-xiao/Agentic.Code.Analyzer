## File: apps/meteor/client/views/admin/settings/groups/LDAPGroupPage.tsx

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { Button, Box, TextInput, Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useSetting, useEndpoint } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import BaseGroupPage from './BaseGroupPage';
import { useExternalLink } from '../../../../hooks/useExternalLink';
import { useLdapSync } from '../../../../hooks/useLdapSync';
import { links } from '../../../../lib/links';
import { useEditableSettings } from '../../EditableSettingsContext';

export type LDAPGroupPageProps = ISetting & {
	onClickBack?: () => void;
};

function LDAPGroupPage({ _id, i18nLabel, onClickBack, ...group }: LDAPGroupPageProps) {
    /* Implementation Hidden */
}

export default memo(LDAPGroupPage);

```