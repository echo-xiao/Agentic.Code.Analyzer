## File: apps/meteor/client/views/admin/workspace/components/WorkspaceCardSection.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';

export type WorkspaceCardSectionProps = {
	children: ReactNode;
};

const WorkspaceCardSection = ({ children }: WorkspaceCardSectionProps) => <Box fontScale='p2'>{children}</Box>;

export default WorkspaceCardSection;

```