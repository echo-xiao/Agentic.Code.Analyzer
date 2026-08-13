## File: packages/ui-client/src/components/Contextualbar/ContextualbarIcon.tsx

```typescript
import { ContextualbarV2Icon } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { memo } from 'react';

const ContextualbarIcon = (props: ComponentProps<typeof ContextualbarV2Icon>) => <ContextualbarV2Icon {...props} />;

export default memo(ContextualbarIcon);

```