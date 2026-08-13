## File: apps/meteor/client/components/GenericNoResults/GenericNoResults.tsx

```typescript
import { Box, States, StatesIcon, StatesLink, StatesTitle, StatesSubtitle, StatesActions, StatesAction } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import { useTranslation } from 'react-i18next';

type LinkProps = { linkText: string; linkHref: string } | { linkText?: never; linkHref?: never };
type ButtonProps = { buttonTitle: string; buttonAction: () => void } | { buttonTitle?: never; buttonAction?: never };

export type GenericNoResultsProps = {
	icon?: IconName | null;
	title?: string;
	description?: string;
} & LinkProps &
	ButtonProps;

const GenericNoResults = ({
	icon = 'magnifier',
	title,
	description,
	buttonTitle,
	buttonAction,
	linkHref,
	linkText,
}: GenericNoResultsProps) => {
    /* Implementation Hidden */
};

export default GenericNoResults;

```