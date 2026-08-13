## File: apps/meteor/client/views/omnichannel/appearance/AppearanceForm.tsx

```typescript
import {
	Field,
	FieldRow,
	TextInput,
	ToggleSwitch,
	Accordion,
	AccordionItem,
	FieldGroup,
	InputBox,
	TextAreaInput,
	NumberInput,
	Select,
	MultiSelect,
	FieldHint,
} from '@rocket.chat/fuselage';
import { useId, type ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AppearanceFieldLabel from './AppearanceFieldLabel';
import MarkdownText from '../../../components/MarkdownText';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

const AppearanceForm = () => {
    /* Implementation Hidden */
};

export default AppearanceForm;

```