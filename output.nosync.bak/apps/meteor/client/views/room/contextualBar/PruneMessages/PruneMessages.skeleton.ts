## File: apps/meteor/client/views/room/contextualBar/PruneMessages/PruneMessages.tsx

```typescript
import { Field, FieldLabel, FieldRow, ButtonGroup, Button, CheckBox, Callout } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarScrollableContent,
	ContextualbarFooter,
	ContextualbarClose,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useId } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import PruneMessagesDateTimeRow from './PruneMessagesDateTimeRow';
import UserAutoCompleteMultiple from '../../../../components/UserAutoCompleteMultiple';

type PruneMessagesProps = {
	callOutText?: string;
	validateText?: string;
	users: string[];
	onClickClose: () => void;
	onClickPrune: () => void;
};

const PruneMessages = ({ callOutText, validateText, onClickClose, onClickPrune }: PruneMessagesProps) => {
    /* Implementation Hidden */
};

export default PruneMessages;

```