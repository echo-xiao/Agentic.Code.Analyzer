## File: apps/meteor/client/sidebar/header/MatrixFederationSearch/MatrixFederationManageServerModal.tsx

```typescript
import {
	Divider,
	Modal,
	ButtonGroup,
	Button,
	Field,
	TextInput,
	FieldLabel,
	FieldRow,
	FieldError,
	FieldHint,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
} from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useSetModal, useTranslation, useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

import MatrixFederationRemoveServerList from './MatrixFederationRemoveServerList';
import MatrixFederationSearch from './MatrixFederationSearch';
import { useMatrixServerList } from './useMatrixServerList';

export type MatrixFederationAddServerModalProps = {
	onClickClose: () => void;
};

const getErrorKey = (error: any): TranslationKey | undefined => {
    /* Implementation Hidden */
};

const MatrixFederationAddServerModal = ({ onClickClose }: MatrixFederationAddServerModalProps) => {
    /* Implementation Hidden */
};

export default MatrixFederationAddServerModal;

```