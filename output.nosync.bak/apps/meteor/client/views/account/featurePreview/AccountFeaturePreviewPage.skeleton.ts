## File: apps/meteor/client/views/account/featurePreview/AccountFeaturePreviewPage.tsx

```typescript
import {
	ButtonGroup,
	Button,
	Box,
	ToggleSwitch,
	States,
	StatesIcon,
	StatesTitle,
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
import { usePreferenceFeaturePreviewList, Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { useFeaturePreviewEnableQuery } from '../../../hooks/useFeaturePreviewEnableQuery';

const AccountFeaturePreviewPage = () => {
    /* Implementation Hidden */
};

export default AccountFeaturePreviewPage;

```