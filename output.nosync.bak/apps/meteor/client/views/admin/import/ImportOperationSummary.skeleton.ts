## File: apps/meteor/client/views/admin/import/ImportOperationSummary.tsx

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import { TableRow, TableCell } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
	ImportWaitingStates,
	ImportFileReadyStates,
	ImportPreparingStartedStates,
	ImportingStartedStates,
	ProgressStep,
} from '../../../../app/importer/lib/ImporterProgressStep';
import { useFormatDateAndTime } from '../../../hooks/useFormatDateAndTime';

export type ImportOperationSummaryProps = {
	type: string;
	_updatedAt: Serialized<Date>;
	status: (typeof ProgressStep)[keyof typeof ProgressStep];
	file?: string;
	user: string;
	small?: boolean;
	count?: {
		users?: number;
		channels?: number;
		messages?: number;
		contacts?: number;
		total?: number;
	};
	valid?: boolean;
};

// TODO: review inner logic
function ImportOperationSummary({
	type,
	_updatedAt,
	status,
	file = '',
	user,
	small,
	count: { users = 0, channels = 0, messages = 0, total = 0, contacts = 0 } = {},
	valid,
}: ImportOperationSummaryProps) {
    /* Implementation Hidden */
}

export default ImportOperationSummary;

```