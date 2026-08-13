## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/AutoCompleteOutboundProvider.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { Option, OptionDescription, PaginatedSelectFiltered } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTimeFromNow } from '../../../../../hooks/useTimeFromNow';
import useOutboundProvidersList from '../hooks/useOutboundProvidersList';
import { findLastChatFromChannel } from '../utils/findLastChatFromChannel';

type AutoCompleteOutboundProviderProps = Omit<
	ComponentProps<typeof PaginatedSelectFiltered>,
	'filter' | 'setFilter' | 'options' | 'endReached' | 'renderItem'
> & {
	contact?: Serialized<Omit<ILivechatContact, 'contactManager'>> | null;
	value: string;
	onChange: (value: string) => void;
};

const AutoCompleteOutboundProvider = ({ contact, disabled, value, placeholder, onChange, ...props }: AutoCompleteOutboundProviderProps) => {
    /* Implementation Hidden */
};

export default AutoCompleteOutboundProvider;

```