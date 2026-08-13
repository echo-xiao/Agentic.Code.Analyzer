## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/TemplatePlaceholderSelector/hooks/useAgentSection.tsx

```typescript
import { useUser } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatPhoneNumber } from '../../../../../../../lib/formatPhoneNumber';

type UseAgentSectionProps = {
	onSelect(value: string): void;
};

export const useAgentSection = ({ onSelect }: UseAgentSectionProps) => {
    /* Implementation Hidden */
};

```