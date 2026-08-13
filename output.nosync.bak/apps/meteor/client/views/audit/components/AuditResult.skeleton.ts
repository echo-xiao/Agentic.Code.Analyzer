## File: apps/meteor/client/views/audit/components/AuditResult.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { memo } from 'react';

import AuditMessageList from './AuditMessageList';
import GenericNoResults from '../../../components/GenericNoResults';

export type AuditResultProps = {
	className?: string;
	messages: IMessage[];
};

const AuditResult = ({ className, messages }: AuditResultProps) => {
    /* Implementation Hidden */
};

export default memo(AuditResult);

```