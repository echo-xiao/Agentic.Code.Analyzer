## File: apps/meteor/client/components/message/header/MessageRoles.tsx

```typescript
import { MessageRole, MessageRoles as FuselageMessageRoles } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

export type MessageRolesProps = {
	roles: Array<string>;
	isBot?: boolean;
};

const MessageRoles = ({ roles, isBot }: MessageRolesProps) => {
    /* Implementation Hidden */
};

export default MessageRoles;

```