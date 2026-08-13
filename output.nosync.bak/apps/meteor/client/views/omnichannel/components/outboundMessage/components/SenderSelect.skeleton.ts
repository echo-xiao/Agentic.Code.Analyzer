## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/SenderSelect.tsx

```typescript
import type { IOutboundProviderMetadata } from '@rocket.chat/core-typings';
import { Select } from '@rocket.chat/fuselage';
import { useMemo, type ComponentProps } from 'react';

import { formatPhoneNumber } from '../../../../../lib/formatPhoneNumber';

type SenderSelectProps = Omit<ComponentProps<typeof Select>, 'options'> & {
	provider: IOutboundProviderMetadata | undefined;
};

const SenderSelect = ({ provider, value, onChange, ...props }: SenderSelectProps) => {
    /* Implementation Hidden */
};

export default SenderSelect;

```