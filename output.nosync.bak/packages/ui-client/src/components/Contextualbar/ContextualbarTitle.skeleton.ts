## File: packages/ui-client/src/components/Contextualbar/ContextualbarTitle.tsx

```typescript
import { ContextualbarV2Title } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

const ContextualbarTitle = (props: ComponentProps<typeof ContextualbarV2Title>) => (
	<ContextualbarV2Title id='contextualbarTitle' {...props} />
);

export default ContextualbarTitle;

```