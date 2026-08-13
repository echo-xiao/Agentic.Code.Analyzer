## File: apps/meteor/client/views/room/contextualBar/AutoTranslate/AutoTranslate.tsx

```typescript
import { Callout, FieldGroup, Field, FieldLabel, FieldRow, ToggleSwitch, Select } from '@rocket.chat/fuselage';
import type { SelectOption } from '@rocket.chat/fuselage';
import {
	ContextualbarClose,
	ContextualbarTitle,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarContent,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoom } from '../../contexts/RoomContext';

type AutoTranslateProps = {
	language: string;
	languages: SelectOption[];
	handleSwitch: (e: ChangeEvent<HTMLInputElement>) => void;
	translateEnable: boolean | undefined;
	handleChangeLanguage: (value: string) => void;
	handleClose?: () => void;
};

const AutoTranslate = ({ language, languages, handleSwitch, translateEnable, handleChangeLanguage, handleClose }: AutoTranslateProps) => {
    /* Implementation Hidden */
};

export default AutoTranslate;

```