## File: packages/ui-client/src/components/Header/HeaderTag/HeaderTagIcon.tsx

```typescript
import { Box, Icon } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { isValidElement } from 'react';

type HeaderIconProps = {
	icon: ReactElement<any> | Pick<ComponentPropsWithoutRef<typeof Icon>, 'name' | 'color'> | null;
};

const HeaderTagIcon = ({ icon }: HeaderIconProps) => {
    /* Implementation Hidden */
};

export default HeaderTagIcon;

```