## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/RoomsContextualBar.tsx

```typescript
import { ContextualbarTitle } from '@rocket.chat/fuselage';
import { ContextualbarClose, ContextualbarHeader } from '@rocket.chat/ui-client';
import { useEndpoint, useRouteParameter, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import RoomForm from './RoomForm';
import { ABACQueryKeys } from '../../../../lib/queryKeys';

export type RoomsContextualBarProps = {
	attributeId?: string;
	roomInfo?: { rid: string; name: string };
	attributesData?: { key: string; values: string[] }[];
	redacted?: boolean;

	onClose: () => void;
};

const RoomsContextualBar = ({ roomInfo, attributesData, redacted = false, onClose }: RoomsContextualBarProps) => {
    /* Implementation Hidden */
};

export default RoomsContextualBar;

```