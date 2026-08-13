## File: apps/meteor/client/views/admin/ABAC/ABACAttributesTab/AttributesContextualBar.tsx

```typescript
import { ContextualbarTitle } from '@rocket.chat/fuselage';
import { ContextualbarClose, ContextualbarHeader } from '@rocket.chat/ui-client';
import { useEndpoint, useRouteParameter, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { AttributesFormFormData } from './AttributesForm';
import AttributesForm from './AttributesForm';
import { ABACQueryKeys } from '../../../../lib/queryKeys';

export type AttributesContextualBarProps = {
	attributeId?: string;
	attributeData?: {
		key: string;
		values: string[];
	};
	onClose: () => void;
};

const AttributesContextualBar = ({ attributeData, onClose }: AttributesContextualBarProps) => {
    /* Implementation Hidden */
};

export default AttributesContextualBar;

```