## File: apps/meteor/client/views/omnichannel/additionalForms/PrioritiesSelect.tsx

```typescript
import type { ILivechatPriority, Serialized } from '@rocket.chat/core-typings';
import { LivechatPriorityWeight } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Options, Box, Option, Field, FieldLabel, FieldRow, SelectLegacy } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useCallback, forwardRef, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import { PriorityIcon } from '../priorities/PriorityIcon';

export type PrioritiesSelectProps = {
	value: string;
	label: string;
	options: Serialized<ILivechatPriority[]>;
	onChange: (value: string) => void;
};

export const PrioritiesSelect = ({ value = '', label, options, onChange }: PrioritiesSelectProps) => {
    /* Implementation Hidden */
};

export default PrioritiesSelect;

```