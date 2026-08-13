## File: apps/meteor/client/views/room/webdav/WebdavFilePickerModal/WebdavFilePickerModal.tsx

```typescript
import type { IWebdavNode, IWebdavAccountIntegration } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Modal, Box, IconButton, Select, ModalHeader, ModalTitle, ModalClose, ModalContent, ModalFooter } from '@rocket.chat/fuselage';
import { useStableCallback, useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useSort } from '@rocket.chat/ui-client';
import { useMethod, useToastMessageDispatch, useTranslation } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useState, useEffect, useCallback } from 'react';

import FilePickerBreadcrumbs from './FilePickerBreadcrumbs';
import WebdavFilePickerGrid from './WebdavFilePickerGrid';
import WebdavFilePickerTable from './WebdavFilePickerTable';
import { sortWebdavNodes } from './lib/sortWebdavNodes';
import FilterByText from '../../../../components/FilterByText';

export type WebdavSortOptions = 'name' | 'size' | 'dataModified';

type WebdavFilePickerModalProps = {
	onUpload: (file: File) => Promise<void>;
	onClose: () => void;
	account: IWebdavAccountIntegration;
};

const WebdavFilePickerModal = ({ onUpload, onClose, account }: WebdavFilePickerModalProps) => {
    /* Implementation Hidden */
};

export default WebdavFilePickerModal;

```