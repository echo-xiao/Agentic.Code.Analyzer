## File: packages/ui-client/src/components/Wizard/WizardContent.tsx

```typescript
import { memo, type ReactNode } from 'react';

import { useWizardContext } from './useWizardContext';

type WizardContentProps = {
	id: string;
	children: ReactNode;
};

const WizardContent = ({ id, children }: WizardContentProps) => {
    /* Implementation Hidden */
};

export default memo(WizardContent);

```