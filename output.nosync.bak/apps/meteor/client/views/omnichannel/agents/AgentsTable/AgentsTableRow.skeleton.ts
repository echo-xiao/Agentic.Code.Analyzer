## File: apps/meteor/client/views/omnichannel/agents/AgentsTable/AgentsTableRow.tsx

```typescript
import { Box, IconButton } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useRemoveAgent } from '../hooks/useRemoveAgent';

const AgentsTableRow = ({
	user: { _id, name, username, avatarETag, emails, statusLivechat },
	mediaQuery,
}: {
	user: {
		_id: string;
		name?: string;
		username?: string;
		avatarETag?: string;
		emails?: { address: string }[];
		statusLivechat: string;
	};
	mediaQuery: boolean;
}) => {
    /* Implementation Hidden */
};

export default AgentsTableRow;

```