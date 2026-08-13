## File: packages/livechat/src/components/Menu/PopoverMenuWrapper.tsx

```typescript
import { Component, type ComponentChildren } from 'preact';
import type { TargetedEvent } from 'preact/compat';

import Menu from './Menu';
import styles from './styles.scss';
import { normalizeDOMRect } from '../../helpers/normalizeDOMRect';

type PopoverMenuWrapperProps = {
	children?: ComponentChildren;
	dismiss: () => void;
	triggerBounds: DOMRect;
	overlayBounds: DOMRect;
};

type PopoverMenuWrapperState = {
	position?: {
		left?: number;
		right?: number;
		top?: number;
		bottom?: number;
	};
	placement?: string;
};

class PopoverMenuWrapper extends Component<PopoverMenuWrapperProps, PopoverMenuWrapperState> {
	override state: PopoverMenuWrapperState = {};

	menuRef: (Component & { base: Element }) | null = null;

	handleRef = (ref: (Component & { base: Element }) | null) => {
		this.menuRef = ref;
	};

	handleClick = ({ target }: TargetedEvent<HTMLElement, MouseEvent>) => {
		if (!(target as HTMLElement)?.closest(`.${styles.menu__item}`)) {
			return;
		}

		const { dismiss } = this.props;
		dismiss();
	};

	override componentDidMount() {
        /* Implementation Hidden */
    }

	render = ({ children }: PopoverMenuWrapperProps) => (
		<Menu
			ref={this.handleRef}
			style={{ position: 'absolute', ...this.state.position }}
			placement={this.state.placement}
			onClickCapture={this.handleClick}
		>
			{children}
		</Menu>
	);
}

export default PopoverMenuWrapper;

```