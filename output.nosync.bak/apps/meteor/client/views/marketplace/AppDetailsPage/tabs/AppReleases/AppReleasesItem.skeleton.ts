## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppReleases/AppReleasesItem.tsx

```typescript
import { AccordionItem, Box } from '@rocket.chat/fuselage';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';

import { useTimeAgo } from '../../../../../hooks/useTimeAgo';
import { purifyOptions } from '../../../lib/purifyOptions';

type IRelease = {
	version: string;
	createdDate: string;
	detailedChangelog: {
		raw: string;
		rendered: string;
	};
};

type ReleaseItemProps = {
	release: IRelease;
};

const AppReleasesItem = ({ release, ...props }: ReleaseItemProps) => {
    /* Implementation Hidden */
};

export default AppReleasesItem;

```