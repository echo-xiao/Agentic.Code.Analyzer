## File: apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceSetupModal/RegisterWorkspaceSetupModal.tsx

```typescript
import { validateEmail } from '@rocket.chat/tools';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useEffect, useState } from 'react';

import RegisteredWorkspaceModal from '../RegisteredWorkspaceModal';
import RegisterWorkspaceSetupStepOneModal from './RegisterWorkspaceSetupStepOneModal';
import RegisterWorkspaceSetupStepTwoModal from './RegisterWorkspaceSetupStepTwoModal';

export type RegisterWorkspaceSetupModalProps = {
	onClose: () => void;
	onStatusChange?: () => void;
};

const RegisterWorkspaceSetupModal = ({ onClose }: RegisterWorkspaceSetupModalProps) => {
    /* Implementation Hidden */
};

export default RegisterWorkspaceSetupModal;

```