## File: apps/meteor/client/views/admin/rooms/RoomsTableFilters.tsx

```typescript
import { Box, Icon, TextInput } from '@rocket.chat/fuselage';
import type { OptionProp } from '@rocket.chat/ui-client';
import { MultiSelectCustom } from '@rocket.chat/ui-client';
import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

const initialRoomTypeFilterStructure = [
	{
		id: 'filter_by_room',
		text: 'Filter_by_room',
		isGroupTitle: true,
	},
	{
		id: 'd',
		text: 'Direct_Message',
		checked: false,
	},
	{
		id: 'discussions',
		text: 'Discussions',
		checked: false,
	},
	{
		id: 'l',
		text: 'Omnichannel',
		checked: false,
	},
	{
		id: 'p',
		text: 'Private_Channels',
		checked: false,
	},
	{
		id: 'c',
		text: 'Public_Channels',
		checked: false,
	},
	{
		id: 'teams',
		text: 'Teams',
		checked: false,
	},
] as OptionProp[];

export type RoomsTableFiltersProps = { setFilters: Dispatch<SetStateAction<any>> };

const RoomsTableFilters = ({ setFilters }: RoomsTableFiltersProps) => {
    /* Implementation Hidden */
};

export default RoomsTableFilters;

```