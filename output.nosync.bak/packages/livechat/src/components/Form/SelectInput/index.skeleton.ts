## File: packages/livechat/src/components/Form/SelectInput/index.tsx

```typescript
import type { ComponentChild, Ref } from 'preact';
import type { TargetedEvent } from 'preact/compat';
import type { JSXInternal } from 'preact/src/jsx';

import styles from './styles.scss';
import { createClassName } from '../../../helpers/createClassName';
import ArrowIcon from '../../../icons/arrowDown.svg';

type SelectInputProps = {
	name?: string;
	placeholder?: ComponentChild;
	options: { value: string; label: ComponentChild }[];
	disabled?: boolean;
	small?: boolean;
	error?: boolean;
	onChange?: JSXInternal.EventHandler<TargetedEvent<HTMLSelectElement, Event>>;
	onInput?: JSXInternal.EventHandler<TargetedEvent<HTMLSelectElement, Event>>;
	onBlur?: JSXInternal.EventHandler<TargetedEvent<HTMLSelectElement, Event>>;
	ref?: Ref<HTMLSelectElement>;
	className?: string;
	style?: JSXInternal.CSSProperties;
	value?: string;
};

export const SelectInput = ({
	name,
	placeholder,
	options = [],
	disabled,
	small,
	error,
	onInput,
	onBlur,
	onChange = () => undefined,
	className,
	style = {},
	value,
	ref,
}: SelectInputProps) => {
    /* Implementation Hidden */
};

```