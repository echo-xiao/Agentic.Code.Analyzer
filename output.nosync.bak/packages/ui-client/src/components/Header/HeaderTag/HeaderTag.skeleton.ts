## File: packages/ui-client/src/components/Header/HeaderTag/HeaderTag.tsx

```typescript
import { Box, Tag } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

type HeaderTagProps = ComponentPropsWithoutRef<typeof Tag>;

const HeaderTag = ({ children, ...props }: HeaderTagProps) => (
	<Box p={4} withTruncatedText minWidth='x32'>
		<Tag medium {...props}>
			{children}
		</Tag>
	</Box>
);

export default HeaderTag;

```