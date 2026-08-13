## File: apps/meteor/client/sidebar/header/MatrixFederationSearch/FederatedRoomListItem.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Button, Icon } from '@rocket.chat/fuselage';
import type { IFederationPublicRooms } from '@rocket.chat/rest-typings';
import { useTranslation } from 'react-i18next';

export type FederatedRoomListItemProps = IFederationPublicRooms & {
	disabled: boolean;
	onClickJoin: () => void;
};

const clampLine = css`
	line-clamp: 6;
`;

const FederatedRoomListItem = ({
	name,
	topic,
	canonicalAlias,
	joinedMembers,
	onClickJoin,
	canJoin,
	disabled,
}: FederatedRoomListItemProps) => {
    /* Implementation Hidden */
};

export default FederatedRoomListItem;

```