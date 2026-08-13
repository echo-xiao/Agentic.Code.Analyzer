## File: packages/fuselage-ui-kit/src/surfaces/ModalSurface.tsx

```typescript
import { Margins } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';

import { Surface } from './Surface';

export type ModalSurfaceProps = {
	children?: ReactNode;
};

const ModalSurface = ({ children }: ModalSurfaceProps) => (
	<Surface type='modal'>
		<Margins blockEnd={16}>{children}</Margins>
	</Surface>
);

export default ModalSurface;

```