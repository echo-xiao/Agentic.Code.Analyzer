## File: apps/meteor/client/views/account/accessibility/AccessibilityPage.tsx

```typescript
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { css } from '@rocket.chat/css-in-js';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Accordion, AccordionItem, Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import {
	FieldDescription,
	Field,
	FieldGroup,
	FieldHint,
	FieldLabel,
	FieldRow,
	RadioButton,
	Select,
	ToggleSwitch,
} from '@rocket.chat/fuselage-forms';
import { ExternalLink, Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useTranslation, useToastMessageDispatch, useEndpoint, useSetting, useLocationHash } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useId, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { fontSizes } from './fontSizes';
import type { AccessibilityPreferencesData } from './hooks/useAcessibilityPreferencesValues';
import { useAccessiblityPreferencesValues } from './hooks/useAcessibilityPreferencesValues';
import { useCreateFontStyleElement } from './hooks/useCreateFontStyleElement';
import { themeItems as themes } from './themeItems';
import { getDirtyFields } from '../../../lib/getDirtyFields';
import { links } from '../../../lib/links';

const AccessibilityPage = () => {
    /* Implementation Hidden */
};

export default AccessibilityPage;

```