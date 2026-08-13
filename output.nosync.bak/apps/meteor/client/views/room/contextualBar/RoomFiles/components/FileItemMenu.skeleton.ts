## File: apps/meteor/client/views/room/contextualBar/RoomFiles/components/FileItemMenu.tsx

```typescript
import type { IRoom, IUpload } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import { Box } from '@rocket.chat/fuselage';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation, useUserId } from '@rocket.chat/ui-contexts';
import { memo, useEffect, useId } from 'react';

import { getURL } from '../../../../../../app/utils/client';
import { download, downloadAs } from '../../../../../lib/download';
import { useMessageDeletionIsAllowed } from '../hooks/useMessageDeletionIsAllowed';

type FileItemMenuProps = {
	rid: IRoom['_id'];
	fileData: IUpload;
	onClickDelete: (id: IUpload['_id']) => void;
};

const ee = new Emitter<Record<string, { result: ArrayBuffer; id: string }>>();

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.addEventListener('message', (event) => {
		if (event.data.type === 'attachment-download-result') {
			const { result } = event.data as { result: ArrayBuffer; id: string };

			ee.emit(event.data.id, { result, id: event.data.id });
		}
	});
}

const FileItemMenu = ({ rid, fileData, onClickDelete }: FileItemMenuProps) => {
    /* Implementation Hidden */
};

export default memo(FileItemMenu);

```