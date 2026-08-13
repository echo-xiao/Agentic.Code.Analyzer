## File: apps/meteor/client/navbar/NavBarControls/NavBarControlsWithData.tsx

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useMediaCallAction } from '@rocket.chat/ui-voip';
import { useCallback, type HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import NavBarControlsMenu from './NavBarControlsMenu';
import { useOmnichannelContactAction } from '../NavBarOmnichannelGroup/hooks/useOmnichannelContactAction';
import { useOmnichannelLivechatToggle } from '../NavBarOmnichannelGroup/hooks/useOmnichannelLivechatToggle';
import { useOmnichannelQueueAction } from '../NavBarOmnichannelGroup/hooks/useOmnichannelQueueAction';

type NavBarControlsMenuProps = Omit<HTMLAttributes<HTMLElement>, 'is'>;

const NavBarControlsWithData = (props: NavBarControlsMenuProps) => {
    /* Implementation Hidden */
};

export default NavBarControlsWithData;

```