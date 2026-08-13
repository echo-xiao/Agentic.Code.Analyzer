## File: apps/meteor/client/views/admin/settings/groups/OAuthGroupPage/OAuthGroupPage.tsx

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { Button } from '@rocket.chat/fuselage';
import { capitalize } from '@rocket.chat/string-helpers';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useAbsoluteUrl, useMethod, useTranslation, useSetModal } from '@rocket.chat/ui-contexts';
import DOMPurify from 'dompurify';
import { memo, useEffect, useState } from 'react';

import CreateOAuthModal from './CreateOAuthModal';
import { strRight } from '../../../../../../lib/utils/stringUtils';
import { useEditableSettingsGroupSections } from '../../../EditableSettingsContext';
import SettingsGroupPage from '../../SettingsGroupPage';
import SettingsSection from '../../SettingsSection';

export type OAuthGroupPageProps = ISetting & {
	onClickBack?: () => void;
};

function OAuthGroupPage({ _id, onClickBack, ...group }: OAuthGroupPageProps) {
    /* Implementation Hidden */
}

export default memo(OAuthGroupPage);

```