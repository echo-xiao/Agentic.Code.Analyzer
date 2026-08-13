## File: apps/meteor/client/views/omnichannel/additionalForms/EeTextInput.tsx

```typescript
import { TextInput, Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type EeTextInputProps = { label: string } & ComponentProps<typeof TextInput>;

export const EeTextInput = ({ label, ...props }: EeTextInputProps) => {
    /* Implementation Hidden */
};

export default EeTextInput;

```