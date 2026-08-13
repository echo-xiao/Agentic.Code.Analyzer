## File: packages/livechat/src/components/Button/index.tsx

```typescript
import type { ComponentChildren } from 'preact';
import type { CSSProperties } from 'preact/compat';
import type { JSXInternal } from 'preact/src/jsx';
import { useTranslation } from 'react-i18next';

import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';

const handleMouseUp: JSXInternal.EventHandler<JSXInternal.TargetedMouseEvent<HTMLButtonElement>> = ({ target }) =>
	(target as HTMLButtonElement)?.blur();

export type ButtonProps = {
	children?: ComponentChildren;
	submit?: boolean;
	form?: string;
	disabled?: boolean;
	outline?: boolean;
	nude?: boolean;
	danger?: boolean;
	secondary?: boolean;
	stack?: boolean;
	small?: boolean;
	loading?: boolean;
	badge?: number;
	icon?: ComponentChildren;
	className?: string;
	style?: CSSProperties;
	img?: string;
	onClick?: JSXInternal.MouseEventHandler<HTMLButtonElement>;
	onMouseUp?: JSXInternal.MouseEventHandler<HTMLButtonElement>;
	full?: boolean;
};

export const Button = ({
	submit,
	form,
	disabled,
	outline,
	nude,
	danger,
	secondary,
	stack,
	small,
	loading,
	badge,
	icon,
	onClick,
	className,
	style = {},
	children,
	img,
	full,
	...props
}: ButtonProps) => {
    /* Implementation Hidden */
};

```