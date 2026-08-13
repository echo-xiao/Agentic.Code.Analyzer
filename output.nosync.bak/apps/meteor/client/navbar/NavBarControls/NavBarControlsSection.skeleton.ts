## File: apps/meteor/client/navbar/NavBarControls/NavBarControlsSection.tsx

```typescript
import { NavBarSection, NavBarGroup } from '@rocket.chat/fuselage';
import { useUser, useLayout } from '@rocket.chat/ui-contexts';
import { useMediaCallAction } from '@rocket.chat/ui-voip';
import { useTranslation } from 'react-i18next';

import NavBarControlsWithData from './NavBarControlsWithData';
import { useOmnichannelEnabled } from '../../views/omnichannel/hooks/useOmnichannelEnabled';
import NavBarOmnichannelGroup from '../NavBarOmnichannelGroup';
import { NavBarItemLoginPage, NavBarItemAdministrationMenu, UserMenu } from '../NavBarSettingsToolbar';
import NavBarVoipGroup from '../NavBarVoipGroup';

const NavBarControlsSection = () => {
    /* Implementation Hidden */
};

export default NavBarControlsSection;

```