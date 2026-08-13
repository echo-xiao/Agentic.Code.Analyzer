## File: packages/ui-client/src/components/Page/PageFooter.tsx

```typescript
import { AnimatedVisibility, Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

type PageFooterProps = { isDirty: boolean } & ComponentProps<typeof Box>;

const PageFooter = ({ children, isDirty, ...props }: PageFooterProps) => {
    /* Implementation Hidden */
};

export default PageFooter;

```