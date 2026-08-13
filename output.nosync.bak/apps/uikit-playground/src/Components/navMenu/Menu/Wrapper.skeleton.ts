## File: apps/uikit-playground/src/Components/navMenu/Menu/Wrapper.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => (
	<Box
		pbs='80px'
		pis='50px'
		display='inline-flex'
		flexDirection='column'
		alignItems='center'
		justifyContent='space-between'
		verticalAlign='middle'
		height='max-content'
		width='100%'
	>
		{children}
	</Box>
);

export default Wrapper;

```