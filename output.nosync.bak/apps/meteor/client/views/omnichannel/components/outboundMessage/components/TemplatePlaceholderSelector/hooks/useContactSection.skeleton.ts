## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/TemplatePlaceholderSelector/hooks/useContactSection.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type UseContactSectionProps = {
	contact?: Serialized<ILivechatContact>;
	onSelect(value: string): void;
};

export const useContactSection = ({ contact, onSelect }: UseContactSectionProps) => {
    /* Implementation Hidden */
};

```