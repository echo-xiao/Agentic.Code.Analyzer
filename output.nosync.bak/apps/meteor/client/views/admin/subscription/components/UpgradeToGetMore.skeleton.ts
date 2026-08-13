## File: apps/meteor/client/views/admin/subscription/components/UpgradeToGetMore.tsx

```typescript
import { Box, States, StatesIcon, StatesTitle, StatesSubtitle, Button, ButtonGroup, CardGrid } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { GenericCard } from '../../../../components/GenericCard';
import { useExternalLink } from '../../../../hooks/useExternalLink';
import { PRICING_LINK } from '../utils/links';

export type UpgradeToGetMoreProps = {
	activeModules: string[];
	isEnterprise: boolean;
	children: ReactNode;
};

const enterpriseModules = [
	'scalability',
	'accessibility-certification',
	'engagement-dashboard',
	'oauth-enterprise',
	'custom-roles',
	'auditing',
];

const UpgradeToGetMore = ({ activeModules, children }: UpgradeToGetMoreProps) => {
    /* Implementation Hidden */
};

export default memo(UpgradeToGetMore);

```