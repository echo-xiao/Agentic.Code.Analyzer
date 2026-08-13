## File: apps/meteor/client/views/room/E2EESetup/RoomE2EENotAllowed.tsx

```typescript
import {
	Box,
	Button,
	States,
	StatesAction,
	StatesActions,
	StatesIcon,
	StatesLink,
	StatesSubtitle,
	StatesTitle,
} from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { links } from '../../../lib/links';

const DOCS_URL = links.go.e2eeGuide;

export type RoomE2EENotAllowedProps = {
	title: string;
	subTitle: string;
	action?: () => void;
	btnText?: string;
	icon: IconName;
};

const RoomE2EENotAllowed = ({ title, subTitle, action, btnText, icon }: RoomE2EENotAllowedProps) => {
    /* Implementation Hidden */
};

export default RoomE2EENotAllowed;

```