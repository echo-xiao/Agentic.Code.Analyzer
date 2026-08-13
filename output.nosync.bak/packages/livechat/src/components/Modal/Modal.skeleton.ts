## File: packages/livechat/src/components/Modal/Modal.tsx

```typescript
import { Component } from 'preact';
import type { HTMLAttributes } from 'preact/compat';

import styles from './styles.scss';
import { createClassName } from '../../helpers/createClassName';

export type ModalProps = {
	open: boolean;
	animated?: boolean;
	timeout?: number;
	dismissByOverlay?: boolean;
	onDismiss?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onDismiss'>;

class Modal extends Component<ModalProps> {
	static override defaultProps = {
		dismissByOverlay: true,
	};

	mounted = false;

	handleKeyDown = ({ key }: KeyboardEvent) => {
		if (key === 'Escape') {
			this.triggerDismiss();
		}
	};

	handleTouchStart = () => {
		const { dismissByOverlay } = this.props;
		if (dismissByOverlay) this.triggerDismiss();
	};

	handleMouseDown = () => {
		const { dismissByOverlay } = this.props;
		if (dismissByOverlay) this.triggerDismiss();
	};

	triggerDismiss = () => {
		const { onDismiss } = this.props;
		if (this.mounted) onDismiss?.();
	};

	override componentDidMount() {
        /* Implementation Hidden */
    }

	override componentWillUnmount() {
        /* Implementation Hidden */
    }

	render = ({ children, animated, open, ...props }: ModalProps) =>
		open ? (
			<div
				data-qa-type='modal-overlay'
				role='presentation'
				className={createClassName(styles, 'modal__overlay')}
				onTouchStart={this.handleTouchStart}
				onMouseDown={this.handleMouseDown}
			>
				<div className={createClassName(styles, 'modal', { animated })} {...props}>
					{children}
				</div>
			</div>
		) : null;
}

export default Modal;

```