## File: apps/meteor/client/views/omnichannel/additionalForms/EeTextAreaInput.tsx

```typescript
import { TextAreaInput, Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type EeTextAreaInputProps = { label: string } & ComponentProps<typeof TextAreaInput>;

export const EeTextAreaInput = ({ label, ...props }: EeTextAreaInputProps) => {
    /* Implementation Hidden */
};

export default EeTextAreaInput;

```