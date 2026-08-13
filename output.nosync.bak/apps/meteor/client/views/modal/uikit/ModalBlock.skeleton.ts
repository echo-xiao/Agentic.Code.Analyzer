## File: apps/meteor/client/views/modal/uikit/ModalBlock.tsx

```typescript
import { FocusScope } from '@react-aria/focus';
import {
	Modal,
	AnimatedVisibility,
	Button,
	Box,
	ModalHeader,
	ModalThumb,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { UiKitComponent, UiKitModal, modalParser } from '@rocket.chat/fuselage-ui-kit';
import type * as UiKit from '@rocket.chat/ui-kit';
import type { FormEvent, FormEventHandler } from 'react';
import { useId, useCallback, useEffect, useMemo, useRef } from 'react';

import { getButtonStyle } from './getButtonStyle';
import { getURL } from '../../../../app/utils/client/getURL';

const focusableElementsString = `
	a[href]:not([tabindex="-1"]),
	area[href]:not([tabindex="-1"]),
	input:not([disabled]):not([tabindex="-1"]),
	select:not([disabled]):not([tabindex="-1"]),
	textarea:not([disabled]):not([tabindex="-1"]),
	button:not([disabled]):not([tabindex="-1"]),
	iframe,
	object,
	embed,
	[tabindex]:not([tabindex="-1"]),
	[contenteditable]`;

const focusableElementsStringInvalid = `
	a[href]:not([tabindex="-1"]):invalid,
	area[href]:not([tabindex="-1"]):invalid,
	input:not([disabled]):not([tabindex="-1"]):invalid,
	select:not([disabled]):not([tabindex="-1"]):invalid,
	textarea:not([disabled]):not([tabindex="-1"]):invalid,
	button:not([disabled]):not([tabindex="-1"]):invalid,
	iframe:invalid,
	object:invalid,
	embed:invalid,
	[tabindex]:not([tabindex="-1"]):invalid,
	[contenteditable]:invalid`;

type ModalBlockParams = {
	view: UiKit.ModalView;
	errors: any;
	appId: string;
	onSubmit: (event: FormEvent) => void;
	onClose: () => void;
	onCancel: FormEventHandler;
};

const isFocusable = (element: Element | null): element is HTMLElement =>
	element !== null && 'focus' in element && typeof element.focus === 'function';

const KeyboardCode = new Map<string, number>([
	['ENTER', 13],
	['ESC', 27],
	['TAB', 9],
]);

const ModalBlock = ({ view, errors, onSubmit, onClose, onCancel }: ModalBlockParams) => {
    /* Implementation Hidden */
};

export default ModalBlock;

```