## File: apps/meteor/client/views/room/contextualBar/Info/ChannelToTeamModal/ChannelToTeamSelection.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box, Margins } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import TeamAutocomplete from '../../../../teams/contextualBar/TeamAutocomplete';

type ChannelToTeamSelectionProps = {
	teamId: IRoom['teamId'];
	onChange: (value: string | string[]) => void;
	onCancel: () => void;
	onConfirm: () => void;
};

const ChannelToTeamSelection = ({ teamId, onCancel, onChange, onConfirm }: ChannelToTeamSelectionProps) => {
    /* Implementation Hidden */
};

export default ChannelToTeamSelection;

```