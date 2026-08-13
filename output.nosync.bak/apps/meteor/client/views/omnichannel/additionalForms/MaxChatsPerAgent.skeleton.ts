## File: apps/meteor/client/views/omnichannel/additionalForms/MaxChatsPerAgent.tsx

```typescript
import { NumberInput, Field, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useId } from 'react';
import type { ComponentProps } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type MaxChatsPerAgentProps = { className?: ComponentProps<typeof Field>['className'] };

const MaxChatsPerAgent = ({ className }: MaxChatsPerAgentProps) => {
    /* Implementation Hidden */
};

export default MaxChatsPerAgent;

```