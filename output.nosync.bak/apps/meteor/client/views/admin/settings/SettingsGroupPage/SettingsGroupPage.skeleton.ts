## File: apps/meteor/client/views/admin/settings/SettingsGroupPage/SettingsGroupPage.tsx

```typescript
import type { ISetting, ISettingColor } from '@rocket.chat/core-typings';
import { Accordion, Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useToastMessageDispatch, useSettingsDispatch, useSettings } from '@rocket.chat/ui-contexts';
import type { ReactNode, MouseEvent, SubmitEvent } from 'react';
import { useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { EditableSetting } from '../../EditableSettingsContext';
import { useEditableSettingsDispatch, useEditableSettings } from '../../EditableSettingsContext';

export type SettingsGroupPageProps = {
	children: ReactNode;
	headerButtons?: ReactNode;
	onClickBack?: () => void;
	_id: string;
	i18nLabel: string;
	i18nDescription?: string;
	tabs?: ReactNode;
	isCustom?: boolean;
};

const SettingsGroupPage = ({
	children = undefined,
	headerButtons = undefined,
	onClickBack,
	_id,
	i18nLabel,
	i18nDescription = undefined,
	tabs = undefined,
	isCustom = false,
}: SettingsGroupPageProps) => {
    /* Implementation Hidden */
};

export default memo(SettingsGroupPage);

```