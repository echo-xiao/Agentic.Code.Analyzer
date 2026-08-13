## File: packages/livechat/src/components/Avatar/index.tsx

```typescript
import { Component } from 'preact';
import type { CSSProperties } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';

type AvatarProps = {
	small?: boolean;
	large?: boolean;
	src?: string;
	description?: string;
	status?: string;
	className?: string;
	style?: CSSProperties;
};

type AvatarState = {
	errored: boolean;
};

export class Avatar extends Component<AvatarProps, AvatarState> {
	static override getDerivedStateFromProps(props: AvatarProps) {
        /* Implementation Hidden */
    }

	override state = {
		errored: false,
	};

	handleError = () => {
		this.setState({ errored: true });
	};

	render = ({ small, large, src, description, status, className, style }: AvatarProps, { errored }: AvatarState) => (
		<div
			aria-label='User picture'
			className={createClassName(styles, 'avatar', { small, large, nobg: src && !errored }, [className])}
			style={style}
		>
			{src && !errored && (
				<img src={src} alt={description} className={createClassName(styles, 'avatar__image')} onError={this.handleError} />
			)}

			{status && <span className={createClassName(styles, 'avatar__status', { small, large, status })} />}
		</div>
	);
}

```