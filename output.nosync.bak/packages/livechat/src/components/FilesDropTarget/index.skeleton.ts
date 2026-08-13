## File: packages/livechat/src/components/FilesDropTarget/index.tsx

```typescript
import type { ComponentChildren, Ref } from 'preact';
import { useState, type CSSProperties, type ChangeEvent, type TargetedEvent } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';

const escapeForRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type FilesDropTargetProps = {
	overlayed?: boolean;
	overlayText?: string;
	accept?: string;
	multiple?: boolean;
	className?: string;
	style?: CSSProperties;
	children?: ComponentChildren;
	inputRef?: Ref<HTMLInputElement>;
	onUpload?: (files: File[]) => void;
};

export const FilesDropTarget = ({
	overlayed,
	overlayText,
	accept,
	multiple,
	className,
	style = {},
	children,
	inputRef,
	onUpload,
}: FilesDropTargetProps) => {
    /* Implementation Hidden */
};

```