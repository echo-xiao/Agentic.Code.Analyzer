## File: apps/meteor/client/views/omnichannel/directory/chats/ChatsFiltersContextualBar.tsx

```typescript
import { Button, ButtonGroup, Field, FieldLabel, FieldRow, InputBox, Select, TextInput } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarScrollableContent,
	ContextualbarFooter,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { usePermission } from '@rocket.chat/ui-contexts';
import { format } from 'date-fns';
import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../../hooks/useHasLicenseModule';
import { CurrentChatTags } from '../../additionalForms';
import AutoCompleteUnits from '../../additionalForms/AutoCompleteUnits';
import AutoCompleteDepartmentMultiple from '../../components/AutoCompleteDepartmentMultiple';
import AutoCompleteMultipleAgent from '../../components/AutoCompleteMultipleAgent';
import { useCustomFieldsQuery } from '../../hooks/useCustomFieldsQuery';
import type { ChatsFiltersQuery } from '../contexts/ChatsContext';
import { useChatsContext } from '../contexts/ChatsContext';

type ChatsFiltersContextualBarProps = {
	onClose: () => void;
};

const ChatsFiltersContextualBar = ({ onClose }: ChatsFiltersContextualBarProps) => {
    /* Implementation Hidden */
};

export default ChatsFiltersContextualBar;

```