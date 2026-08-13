## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/TemplatePlaceholderSelector/TemplatePlaceholderInput.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { Box, Icon, TextInput } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRef, type ChangeEventHandler, type ChangeEvent, type ComponentProps } from 'react';

import PlaceholderSelector from './TemplatePlaceholderSelector';
import type { TemplateParameter } from '../../types/template';

type TemplatePlaceholderInputProps = Omit<ComponentProps<typeof TextInput>, 'value' | 'onChange'> & {
	type?: TemplateParameter['type'];
	value: string;
	contact?: Serialized<ILivechatContact>;
	onChange(value: string): void;
};

const TemplatePlaceholderInput = ({ contact, value = '', type, onChange, ...props }: TemplatePlaceholderInputProps) => {
    /* Implementation Hidden */
};

export default TemplatePlaceholderInput;

```