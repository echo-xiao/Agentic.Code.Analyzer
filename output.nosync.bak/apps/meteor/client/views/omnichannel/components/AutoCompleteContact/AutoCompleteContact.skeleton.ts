## File: apps/meteor/client/views/omnichannel/components/AutoCompleteContact/AutoCompleteContact.tsx

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import { PaginatedSelectFiltered } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { ILivechatContactWithManagerData } from '@rocket.chat/rest-typings';
import type { ComponentProps, ReactNode, SyntheticEvent } from 'react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useContactsList } from './useContactsList';

type OptionProps = {
	role: 'option';
	title?: string;
	index: number;
	label: string;
	value: string;
	selected: boolean;
	focus: boolean;
	onMouseDown(event: SyntheticEvent): void;
};

export type AutoCompleteContactProps = Omit<
	ComponentProps<typeof PaginatedSelectFiltered>,
	'filter' | 'setFilter' | 'options' | 'endReached' | 'renderItem' | 'value' | 'onChange'
> & {
	value: string;
	onChange: (value: string) => void;
	renderItem?: (props: OptionProps, contact: Serialized<ILivechatContactWithManagerData>) => ReactNode;
};

const AutoCompleteContact = ({ value, placeholder, disabled, renderItem, onChange, ...props }: AutoCompleteContactProps) => {
    /* Implementation Hidden */
};

export default memo(AutoCompleteContact);

```