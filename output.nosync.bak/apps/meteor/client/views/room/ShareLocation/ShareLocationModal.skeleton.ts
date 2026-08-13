## File: apps/meteor/client/views/room/ShareLocation/ShareLocationModal.tsx

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useTranslation, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getGeolocationPermission } from './getGeolocationPermission';
import { getGeolocationPosition } from './getGeolocationPosition';
import MapView from '../../../components/message/content/location/MapView';

type ShareLocationModalProps = {
	rid: IRoom['_id'];
	tmid: IMessage['tmid'];
	onClose: () => void;
};

const ShareLocationModal = ({ rid, tmid, onClose }: ShareLocationModalProps) => {
    /* Implementation Hidden */
};

export default ShareLocationModal;

```