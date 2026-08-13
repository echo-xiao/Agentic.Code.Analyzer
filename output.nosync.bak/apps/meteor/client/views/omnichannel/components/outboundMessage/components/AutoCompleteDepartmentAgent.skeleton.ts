## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/AutoCompleteDepartmentAgent.tsx

```typescript
import type { ILivechatDepartmentAgents, Serialized } from '@rocket.chat/core-typings';
import { AutoComplete, Box, Chip, Option, OptionAvatar, OptionContent } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import type { AllHTMLAttributes } from 'react';
import { useMemo, useState } from 'react';

type AutoCompleteDepartmentAgentProps = Omit<AllHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	error?: boolean;
	value: string;
	onChange(value: string): void;
	agents?: Serialized<ILivechatDepartmentAgents>[];
};

const AutoCompleteDepartmentAgent = ({ value, onChange, agents, placeholder, ...props }: AutoCompleteDepartmentAgentProps) => {
    /* Implementation Hidden */
};

export default AutoCompleteDepartmentAgent;

```