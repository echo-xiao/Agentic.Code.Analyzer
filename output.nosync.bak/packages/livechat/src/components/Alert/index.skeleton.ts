## File: packages/livechat/src/components/Alert/index.tsx

```typescript
import type { ComponentChildren } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { useTranslation } from 'react-i18next';

import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';
import CloseIcon from '../../icons/close.svg';

export type AlertProps = {
	id?: string;
	onDismiss?: (id?: string) => void;
	success?: boolean;
	warning?: boolean;
	error?: boolean;
	color?: string;
	hideCloseButton?: boolean;
	className?: string;
	style?: JSXInternal.CSSProperties;
	children?: ComponentChildren;
	timeout?: number;
};

const Alert = ({
	id,
	onDismiss,
	success,
	warning,
	error,
	color,
	hideCloseButton = false,
	className,
	style = {},
	children,
	timeout = 3000,
}: AlertProps) => {
    /* Implementation Hidden */
};

export default Alert;

```