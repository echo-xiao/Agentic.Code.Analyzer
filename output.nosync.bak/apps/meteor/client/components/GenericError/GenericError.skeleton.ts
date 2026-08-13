## File: apps/meteor/client/components/GenericError/GenericError.tsx

```typescript
import { Box, States, StatesIcon, StatesTitle, StatesActions, StatesAction } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import { useTranslation } from 'react-i18next';

export type GenericErrorProps = {
	icon?: IconName;
	title?: string;
	buttonTitle?: string;
	buttonAction?: () => void;
};

const GenericError = ({ icon = 'magnifier', title, buttonTitle, buttonAction }: GenericErrorProps) => {
    /* Implementation Hidden */
};

export default GenericError;

```