## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppDetails/AppDetails.tsx

```typescript
import { Box, Button, Callout, Chip, Margins } from '@rocket.chat/fuselage';
import { ExternalLink } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';

import AppDetailsAPIs from './AppDetailsAPIs';
import { normalizeUrl } from './normalizeUrl';
import { useExternalLink } from '../../../../../hooks/useExternalLink';
import { useHasLicenseModule } from '../../../../../hooks/useHasLicenseModule';
import { GET_ADDONS_LINK } from '../../../../admin/subscription/utils/links';
import ScreenshotCarouselAnchor from '../../../components/ScreenshotCarouselAnchor';
import type { AppInfo } from '../../../definitions/AppInfo';
import { purifyOptions } from '../../../lib/purifyOptions';

export type AppDetailsProps = {
	app: AppInfo;
};

const AppDetails = ({ app }: AppDetailsProps) => {
    /* Implementation Hidden */
};

export default AppDetails;

```