## File: apps/meteor/client/views/admin/subscription/components/cards/FeaturesCard.tsx

```typescript
import { Box, Card, CardBody, CardControls, CardTitle, FramedIcon } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { useTranslation } from 'react-i18next';

import { PRICING_LINK } from '../../utils/links';
import InfoTextIconModal from '../InfoTextIconModal';

type FeatureSet = {
	success?: boolean;
	neutral?: boolean;
	title: string;
	infoText?: string;
};

export type FeaturesCardProps = {
	activeModules: string[];
	isEnterprise: boolean;
};

const getFeatureSet = (modules: string[], isEnterprise: boolean): FeatureSet[] => {
    /* Implementation Hidden */
};

const FeaturesCard = ({ activeModules, isEnterprise }: FeaturesCardProps) => {
    /* Implementation Hidden */
};

export default FeaturesCard;

```