## File: apps/meteor/client/views/omnichannel/directory/contacts/RemoveContactModal.tsx

```typescript
import { Box, Input } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useState, useId } from 'react';
import { useTranslation } from 'react-i18next';

type RemoveContactModalProps = {
	_id: string;
	name: string;
	channelsCount: number;
	onClose: () => void;
};

const RemoveContactModal = ({ _id, name, channelsCount, onClose }: RemoveContactModalProps) => {
    /* Implementation Hidden */
};

export default RemoveContactModal;

```