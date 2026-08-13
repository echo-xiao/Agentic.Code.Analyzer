## File: apps/meteor/client/views/audit/components/SecurityLogDisplayModal.tsx

```typescript
import type { IAuditServerUserActor, IAuditServerSystemActor, IAuditServerAppActor } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { GenericModal } from '@rocket.chat/ui-client';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { AppInfoField } from './AppInfoField';
import AuditModalField from './AuditModalField';
import AuditModalLabel from './AuditModalLabel';
import AuditModalText from './AuditModalText';

type SecurityLogDisplayProps = {
	timestamp: string;
	actor: IAuditServerUserActor | IAuditServerSystemActor | IAuditServerAppActor;
	setting: string;
	changedFrom: string;
	changedTo: string;
	onCancel: () => void;
};

const SecurityLogDisplayModal = ({ timestamp, actor, setting, changedFrom, changedTo, onCancel }: SecurityLogDisplayProps) => {
    /* Implementation Hidden */
};

export default SecurityLogDisplayModal;

```