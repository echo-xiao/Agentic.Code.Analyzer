## File: apps/meteor/client/views/marketplace/AppsPage/NoInstalledAppMatchesEmptyState.tsx

```typescript
import {
	Box,
	States,
	StatesIcon,
	StatesTitle,
	StatesSubtitle,
	StatesSuggestion,
	StatesSuggestionText,
	StatesActions,
	StatesAction,
} from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

export type NoInstalledAppMatchesEmptyStateProps = {
	shouldShowSearchText: boolean;
	text: string;
	onButtonClick: () => void;
};

const NoInstalledAppMatchesEmptyState = ({ shouldShowSearchText, text, onButtonClick }: NoInstalledAppMatchesEmptyStateProps) => {
    /* Implementation Hidden */
};

export default NoInstalledAppMatchesEmptyState;

```