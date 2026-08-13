## File: apps/meteor/client/views/admin/featurePreview/AdminFeaturePreviewPage.tsx

```typescript
import {
	ButtonGroup,
	Button,
	Box,
	ToggleSwitch,
	Accordion,
	AccordionItem,
	Field,
	FieldGroup,
	FieldLabel,
	FieldRow,
	FieldHint,
	Callout,
	Margins,
} from '@rocket.chat/fuselage';
import { useDefaultSettingFeaturePreviewList, Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useToastMessageDispatch, useTranslation, useSettingsDispatch } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { useFeaturePreviewEnableQuery } from '../../../hooks/useFeaturePreviewEnableQuery';
import { useEditableSetting } from '../EditableSettingsContext';
import Setting from '../settings/Setting';
import SettingsGroupPageSkeleton from '../settings/SettingsGroupPage/SettingsGroupPageSkeleton';

const AdminFeaturePreviewPage = () => {
    /* Implementation Hidden */
};

export default AdminFeaturePreviewPage;

```