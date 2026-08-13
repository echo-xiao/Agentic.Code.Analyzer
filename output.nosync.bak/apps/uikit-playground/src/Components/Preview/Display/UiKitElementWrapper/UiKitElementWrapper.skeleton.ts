## File: apps/uikit-playground/src/Components/Preview/Display/UiKitElementWrapper/UiKitElementWrapper.tsx

```typescript
import './UiKitElementWrapper.scss';
import { Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

const ElementWrapper = (props: ComponentProps<typeof Box>) => <Box className='uikit-element-wrapper' {...props} />;

export default ElementWrapper;

```