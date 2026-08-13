## File: apps/meteor/client/views/omnichannel/additionalForms/SlaPoliciesSelect.tsx

```typescript
import type { IOmnichannelServiceLevelAgreements, Serialized } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Field, FieldLabel, FieldRow, Select } from '@rocket.chat/fuselage';
import { useId, useMemo } from 'react';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type SlaPoliciesSelectProps = {
	value: string;
	label: string;
	options: Serialized<IOmnichannelServiceLevelAgreements[]>;
	onChange: (value: string) => void;
};

export const SlaPoliciesSelect = ({ value, label, options, onChange }: SlaPoliciesSelectProps) => {
    /* Implementation Hidden */
};

export default SlaPoliciesSelect;

```