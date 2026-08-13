## File: apps/meteor/client/views/home/cards/CustomContentCard.tsx

```typescript
import { Box, Button, Card, CardBody, CardControls, CardHeader, Icon, Tag } from '@rocket.chat/fuselage';
import { useRole, useSettingSetValue, useSetting, useToastMessageDispatch, useRouter } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsEnterprise } from '../../../hooks/useIsEnterprise';
import CustomHomepageContent from '../CustomHomePageContent';

const CustomContentCard = (props: Omit<ComponentProps<typeof Card>, 'type'>) => {
    /* Implementation Hidden */
};

export default CustomContentCard;

```