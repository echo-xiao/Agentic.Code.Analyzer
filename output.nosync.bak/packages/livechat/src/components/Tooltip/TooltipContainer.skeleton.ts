## File: packages/livechat/src/components/Tooltip/TooltipContainer.tsx

```typescript
import { Component, type ComponentChildren } from 'preact';

import Tooltip, { type Placement } from './Tooltip';
import { TooltipContext } from './TooltipContext';

export type TooltipContainerProps = {
	children: any;
};

type TooltipContainerState = {
	tooltip: any;
	activeChild: number | null;
	event: any;
	placement: Placement;
	content?: ComponentChildren;
};

class TooltipContainer extends Component<TooltipContainerProps, TooltipContainerState> {
	override state: TooltipContainerState = {
		tooltip: null,
		activeChild: null,
		event: null,
		placement: null,
	};

	showTooltip = (
		event: any,
		{ content, placement = 'bottom', childIndex }: { content: any; placement?: Placement; childIndex: number | null },
	) => {
		const triggerBounds = event.target.getBoundingClientRect();
		this.setState({
			tooltip: (
				<Tooltip floating placement={placement} triggerBounds={triggerBounds}>
					{content}
				</Tooltip>
			),
			activeChild: childIndex,
			event,
			placement,
			content,
		});
	};

	hideTooltip = () => {
		this.setState({ tooltip: null });
	};

	UNSAFE_componentWillReceiveProps(props: TooltipContainerProps) {
        /* Implementation Hidden */
    }

	render({ children }: TooltipContainerProps) {
        /* Implementation Hidden */
    }
}

export default TooltipContainer;

```