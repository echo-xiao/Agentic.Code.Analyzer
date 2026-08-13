## File: apps/meteor/client/views/omnichannel/departments/DepartmentAgentsTable/RemoveAgentButton.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

function RemoveAgentButton({ agentId, onRemove }: { agentId: string; onRemove: (agentId: string) => void }) {
    /* Implementation Hidden */
}

export default RemoveAgentButton;

```