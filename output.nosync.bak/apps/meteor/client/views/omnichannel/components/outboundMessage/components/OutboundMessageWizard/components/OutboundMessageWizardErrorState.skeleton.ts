## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/components/OutboundMessageWizardErrorState.tsx

```typescript
import { States, StatesIcon, StatesTitle, StatesActions, StatesAction, StatesSubtitle } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

type Props = {
	title?: string;
	description?: string;
	onRetry?(): void;
};

const OutboundMessageWizardErrorState = ({ title, description, onRetry }: Props) => {
    /* Implementation Hidden */
};

export default OutboundMessageWizardErrorState;

```