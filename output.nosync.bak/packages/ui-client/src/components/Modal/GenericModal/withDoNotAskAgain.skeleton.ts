## File: packages/ui-client/src/components/Modal/GenericModal/withDoNotAskAgain.tsx

```typescript
import { Box, Label, CheckBox } from '@rocket.chat/fuselage';
import { useUserPreference, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import type { ComponentType, ReactNode } from 'react';
import { useId, useState } from 'react';

import type { DontAskAgainList } from '../../../hooks/useDontAskAgain';

type DoNotAskAgainProps = {
	onConfirm: (...args: any) => Promise<void> | void;
	dontAskAgain: {
		action: string;
		label: string;
	};
};

export type RequiredModalProps = {
	onConfirm?: (...args: any) => Promise<void> | void;
	dontAskAgain?: ReactNode;
};

function withDoNotAskAgain<T extends RequiredModalProps>(Component: ComponentType<any>) {
    /* Implementation Hidden */
}

export { withDoNotAskAgain };

```