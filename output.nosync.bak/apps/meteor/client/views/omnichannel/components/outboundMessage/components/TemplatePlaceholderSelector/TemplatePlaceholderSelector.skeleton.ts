## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/TemplatePlaceholderSelector/TemplatePlaceholderSelector.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { GenericMenu } from '@rocket.chat/ui-client';
import type { ComponentProps } from 'react';

import PlaceholderButton from './TemplatePlaceholderButton';
import { useAgentSection } from './hooks/useAgentSection';
import { useContactSection } from './hooks/useContactSection';
import { useCustomFieldsSection } from './hooks/useCustomFieldsSection';

type PlaceholderSelectorProps = Pick<ComponentProps<typeof PlaceholderButton>, 'mis' | 'disabled'> & {
	contact?: Serialized<ILivechatContact>;
	onSelect(value: string): void;
	onOpenChange?(isOpen: boolean): void;
};

const TemplatePlaceholderSelector = ({ contact, disabled, onSelect, onOpenChange, ...props }: PlaceholderSelectorProps) => {
    /* Implementation Hidden */
};

export default TemplatePlaceholderSelector;

```