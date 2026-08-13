## File: packages/ui-voip/src/components/PeerAutocomplete.tsx

```typescript
import type { UserStatus } from '@rocket.chat/core-typings';
import { AutoComplete, Option, Avatar, Field, FieldRow, FieldDescription, FieldError, StatusBullet, Box } from '@rocket.chat/fuselage';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { isFirstPeerAutocompleteOption } from '../context';

export type PeerAutocompleteOptions = {
	value: string; // user id
	label: string; // name or username
	status?: UserStatus;
	identifier?: string | number; // extension number
	avatarUrl?: string;
};

type PeerAutocompleteProps = {
	options: PeerAutocompleteOptions[];
	onChangeValue: (value: string | string[]) => void;
	onChangeFilter: (filter: string) => void;
	filter: string;
	value: string | undefined;
	error?: string;
};

const PeerAutocomplete = ({ options, filter, value, onChangeValue, onChangeFilter, error }: PeerAutocompleteProps) => {
    /* Implementation Hidden */
};

export default PeerAutocomplete;

```