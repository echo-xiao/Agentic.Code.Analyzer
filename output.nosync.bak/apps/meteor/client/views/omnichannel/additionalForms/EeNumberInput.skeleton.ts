## File: apps/meteor/client/views/omnichannel/additionalForms/EeNumberInput.tsx

```typescript
import { NumberInput, Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type EeNumberInputProps = { label: string } & ComponentProps<typeof NumberInput>;

export const EeNumberInput = ({ label, ...props }: EeNumberInputProps) => {
    /* Implementation Hidden */
};

export default EeNumberInput;

```