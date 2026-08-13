## File: apps/meteor/client/views/home/cards/MobileAppsCard.tsx

```typescript
import type { Card } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { GenericCard, GenericCardButton } from '../../../components/GenericCard';
import { useExternalLink } from '../../../hooks/useExternalLink';
import { links } from '../../../lib/links';

const GOOGLE_PLAY_URL = links.go.mobileAppGoogle;
const APP_STORE_URL = links.go.mobileAppApple;

const MobileAppsCard = (props: Omit<ComponentProps<typeof Card>, 'type'>) => {
    /* Implementation Hidden */
};

export default MobileAppsCard;

```