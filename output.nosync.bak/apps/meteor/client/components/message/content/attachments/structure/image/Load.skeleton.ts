## File: apps/meteor/client/components/message/content/attachments/structure/image/Load.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Icon, Palette } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from 'react-i18next';

import ImageBox from './ImageBox';

export type LoadProps = ComponentPropsWithoutRef<typeof Box> & { load: () => void };

const Load = ({ load, ...props }: LoadProps) => {
    /* Implementation Hidden */
};

export default Load;

```