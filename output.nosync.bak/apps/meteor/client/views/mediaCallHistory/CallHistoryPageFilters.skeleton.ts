## File: apps/meteor/client/views/mediaCallHistory/CallHistoryPageFilters.tsx

```typescript
import { Box, Icon, TextInput, Select } from '@rocket.chat/fuselage';
import type { OptionProp } from '@rocket.chat/ui-client';
import { MultiSelectCustom } from '@rocket.chat/ui-client';
import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent, Key, SubmitEvent } from 'react';
import { useTranslation } from 'react-i18next';

type StatesFilter = Array<'ended' | 'transferred' | 'not-answered' | 'failed'>;
type TypeFilter = 'inbound' | 'outbound' | 'all';

export type CallHistoryPageFiltersProps = {
	onChangeText: (nameOrUsernameOrExtension: string) => void;
	onChangeType: (type: TypeFilter) => void;
	onChangeStates: (states: StatesFilter) => void;
	searchText: string;
	type: TypeFilter;
	states: StatesFilter;
};

const typeOptions = [
	{ id: 'inbound', text: 'Inbound' },
	{ id: 'outbound', text: 'Outbound' },
	{ id: 'all', text: 'All_directions' },
] as const;

const statesOptions = [
	{ id: 'filter_by_status', text: 'Filter_By_Status', isGroupTitle: true },
	{ id: 'ended', text: 'Ended', icon: { name: 'phone-off', color: 'default' } },
	{ id: 'transferred', text: 'Transferred', icon: { name: 'arrow-forward', color: 'default' } },
	{ id: 'not-answered', text: 'Not_answered', icon: { name: 'phone-question-mark', color: 'warning' } },
	{ id: 'failed', text: 'Failed', icon: { name: 'phone-issue', color: 'danger' } },
] as const;

export const useCallHistoryPageFilters = () => {
    /* Implementation Hidden */
};

const CallHistoryPageFilters = ({ onChangeText, onChangeType, onChangeStates, searchText, type, states }: CallHistoryPageFiltersProps) => {
    /* Implementation Hidden */
};

export default CallHistoryPageFilters;

```