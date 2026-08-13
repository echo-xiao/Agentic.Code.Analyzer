## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/TemplateSelect.tsx

```typescript
import type { IOutboundProviderTemplate } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Option, OptionDescription, SelectFiltered } from '@rocket.chat/fuselage';
import { useLanguages } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import type { Key, ComponentProps } from 'react';

type TemplateSelectProps = Omit<ComponentProps<typeof SelectFiltered>, 'value' | 'onChange' | 'options'> & {
	templates: IOutboundProviderTemplate[];
	value: string;
	onChange(value: Key): void;
};

const TemplateSelect = ({ templates, value, onChange, ...props }: TemplateSelectProps) => {
    /* Implementation Hidden */
};

export default TemplateSelect;

```