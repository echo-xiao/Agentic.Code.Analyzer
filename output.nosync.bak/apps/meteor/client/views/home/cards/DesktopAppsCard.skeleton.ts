## File: apps/meteor/client/views/home/cards/DesktopAppsCard.tsx

```typescript
import type { Card } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { GenericCard, GenericCardButton } from '../../../components/GenericCard';
import { useExternalLink } from '../../../hooks/useExternalLink';
import { links } from '../../../lib/links';

const WINDOWS_APP_URL = links.go.desktopAppWindows;
const LINUX_APP_URL = links.go.desktopAppLinux;
const MAC_APP_URL = links.go.desktopAppMac;

const DesktopAppsCard = (props: Omit<ComponentProps<typeof Card>, 'type'>) => {
    /* Implementation Hidden */
};

export default DesktopAppsCard;

```