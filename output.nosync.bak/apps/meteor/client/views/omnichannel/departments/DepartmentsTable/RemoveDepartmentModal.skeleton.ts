## File: apps/meteor/client/views/omnichannel/departments/DepartmentsTable/RemoveDepartmentModal.tsx

```typescript
import { Box, Input } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type RemoveDepartmentModalProps = {
	_id: string;
	name: string;
	reset: () => void;
	onClose: () => void;
};

const RemoveDepartmentModal = ({ _id = '', name, reset, onClose }: RemoveDepartmentModalProps) => {
    /* Implementation Hidden */
};

export default RemoveDepartmentModal;

```