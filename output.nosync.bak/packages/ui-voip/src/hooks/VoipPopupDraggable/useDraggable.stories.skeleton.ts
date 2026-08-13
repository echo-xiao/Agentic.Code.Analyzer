## File: packages/ui-voip/src/hooks/VoipPopupDraggable/useDraggable.stories.tsx

```typescript
import { Box, Button } from '@rocket.chat/fuselage';
import { AnchorPortal } from '@rocket.chat/ui-client';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useLayoutEffect, useState, type Ref } from 'react';
import { within, fireEvent, waitFor, expect, userEvent } from 'storybook/test';

import { useDraggable, DEFAULT_BOUNDING_ELEMENT_OPTIONS } from './DraggableCore';

class BoundingBoxResizeEvent extends Event {
	constructor(
		public width: number,
		public height: number,
	) {
        /* Implementation Hidden */
    }

	get size() {
		return {
			width: this.width,
			height: this.height,
		};
	}
}

const isBoundingBoxResizeEvent = (event: unknown): event is BoundingBoxResizeEvent => {
    /* Implementation Hidden */
};

const BOUNDING_SIZE = 1000;

const DraggableElement = ({
	draggableRef,
	handleRef,
	onClick,
	onClickResize,
	backgroundColor,
	height,
	width,
}: {
	draggableRef: Ref<HTMLElement>;
	handleRef: Ref<HTMLElement>;
	onClick?: () => void;
	onClickResize?: () => void;
	backgroundColor?: string;
	height?: number;
	width?: number;
}) => {
    /* Implementation Hidden */
};

const DraggableBase = ({
	boundingRef,
	draggableRef,
	handleRef,
	onClick,
	onClickResize,
	backgroundColor,
	height,
	width,
}: {
	boundingRef: Ref<HTMLElement>;
	draggableRef: Ref<HTMLElement>;
	handleRef: Ref<HTMLElement>;
	onClick?: () => void;
	onClickResize?: () => void;
	backgroundColor?: string;
	height?: number;
	width?: number;
}) => {
    /* Implementation Hidden */
};

const DraggableBox = () => {
    /* Implementation Hidden */
};

const SECONDARY_DRAGGABLE_BOX_SIZE = 600;

// Component for testing position restore when element is replaced
// E.g. When a state changes the rendered component, the new component should have the same positioning
const DraggableBoxWrapper = () => {
    /* Implementation Hidden */
};

// Story for manual testing
export const DraggableBoxWithControls: Story = {
	render: () => <DraggableBoxWrapper />,
};

const meta = {
	component: DraggableBox,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof DraggableBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// TODO: test other pointer types (pen, touch, etc)
// TODO: use `userEvent` for all tests
const moveHelper = async (handle: HTMLElement, offset: { x: number; y: number }) => {
    /* Implementation Hidden */
};

export const DraggingBehavior: Story = {
	...Default,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement.parentElement || canvasElement);

		await step('should allow dragging an element', async () => {
			const handle = await canvas.findByTestId('drag-handle');
			const draggable = await canvas.findByTestId('draggable-box');

			await expect(handle).toBeInTheDocument();
			await expect(draggable).toBeInTheDocument();

			const initialRect = draggable.getBoundingClientRect();

			await moveHelper(handle, { x: 100, y: 100 });

			await waitFor(async () => {
				const finalRect = draggable.getBoundingClientRect();
				await expect(finalRect.x).toBeCloseTo(initialRect.x + 100, 0);
				await expect(finalRect.y).toBeCloseTo(initialRect.y + 100, 0);
			});
		});

		await step('should only allow dragging when using the handle element', async () => {
			const draggable = await canvas.findByTestId('draggable-box');

			const initialRect = draggable.getBoundingClientRect();

			await moveHelper(draggable, { x: 100, y: 100 });

			await waitFor(async () => {
				const finalRect = draggable.getBoundingClientRect();
				await expect(finalRect.x).toBeCloseTo(initialRect.x, 0);
				await expect(finalRect.y).toBeCloseTo(initialRect.y, 0);
			});
		});

		await step('should not allow dragging with right click', async () => {
			const draggable = await canvas.findByTestId('draggable-box');
			const handle = await canvas.findByTestId('drag-handle');

			const initialRect = draggable.getBoundingClientRect();

			// for some reason `fireEvent` and `userEvent` do not change the `button` property of the event
			// so we need to create a new event manually
			await fireEvent(
				handle,
				new PointerEvent('pointerdown', {
					button: 2,
					pointerType: 'mouse',
				}),
			);

			await fireEvent.pointerMove(document.documentElement, {
				clientX: 50,
				clientY: 50,
			});

			await fireEvent.pointerUp(document.documentElement);

			await waitFor(async () => {
				const finalRect = draggable.getBoundingClientRect();
				await expect(finalRect.x).toBeCloseTo(initialRect.x, 0);
				await expect(finalRect.y).toBeCloseTo(initialRect.y, 0);
			});
		});
	},
};

export const BoundingBehavior: Story = {
	...Default,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement.parentElement || canvasElement);

		await step('should keep element within screen bounds when dragged outside (top-left)', async () => {
			const handle = await canvas.findByTestId('drag-handle');
			const draggable = await canvas.findByTestId('draggable-box');
			const boundingBox = await canvas.findByTestId('bounding-box');

			await moveHelper(handle, { x: -500, y: -500 });

			await waitFor(async () => {
				const finalRect = draggable.getBoundingClientRect();
				const boundingBoxRect = boundingBox.getBoundingClientRect();
				await expect(finalRect.left).toBeGreaterThanOrEqual(boundingBoxRect.left);
				await expect(finalRect.top).toBeGreaterThanOrEqual(boundingBoxRect.top);
			});
		});

		await step('should keep element within screen bounds when dragged outside (bottom-right)', async () => {
			const handle = await canvas.findByTestId('drag-handle');
			const draggable = await canvas.findByTestId('draggable-box');
			const boundingBox = await canvas.findByTestId('bounding-box');

			await moveHelper(handle, { x: BOUNDING_SIZE + 500, y: BOUNDING_SIZE + 500 });

			await waitFor(async () => {
				const finalRect = draggable.getBoundingClientRect();
				const currentBoundingBoxRect = boundingBox.getBoundingClientRect();
				await expect(finalRect.right).toBeLessThanOrEqual(currentBoundingBoxRect.right + 1);
				await expect(finalRect.bottom).toBeLessThanOrEqual(currentBoundingBoxRect.bottom + 1);
			});
		});

		await step('should adjust element position when screen is resized and element is cut off', async () => {
			const handle = await canvas.findByTestId('drag-handle');
			const draggable = await canvas.findByTestId('draggable-box');
			const boundingBox = await canvas.findByTestId('bounding-box');

			const initialRect = boundingBox.getBoundingClientRect();

			await moveHelper(handle, { x: BOUNDING_SIZE - initialRect.width, y: BOUNDING_SIZE - initialRect.height });

			await waitFor(async () => {
				const rect = draggable.getBoundingClientRect();
				await expect(rect.right).toBeCloseTo(initialRect.right, 0);
				await expect(rect.bottom).toBeCloseTo(initialRect.bottom, 0);
			});

			window.dispatchEvent(new BoundingBoxResizeEvent(500, 500));

			await waitFor(async () => {
				const finalRect = draggable.getBoundingClientRect();
				const newBoundingBoxRect = boundingBox.getBoundingClientRect();

				await expect(newBoundingBoxRect.width).toBeCloseTo(500, 0);
				await expect(newBoundingBoxRect.height).toBeCloseTo(500, 0);

				await expect(finalRect.right).toBeCloseTo(newBoundingBoxRect.right, 0);
				await expect(finalRect.bottom).toBeCloseTo(newBoundingBoxRect.bottom, 0);
			});
		});
	},
};

export const ElementUpdates: Story = {
	render: () => <DraggableBoxWrapper />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement.parentElement || canvasElement);

		await step('should maintain position when element is replaced', async () => {
			const handle = await canvas.findByTestId('drag-handle');
			const draggable = await canvas.findByTestId('draggable-box');

			const initialRect = draggable.getBoundingClientRect();

			await moveHelper(handle, { x: 50, y: 50 });

			let positionBeforeRerender: DOMRect = new DOMRect(0, 0, 0, 0);
			await waitFor(async () => {
				positionBeforeRerender = draggable.getBoundingClientRect();
				await expect(positionBeforeRerender.x).toBeCloseTo(initialRect.x + 50, 0);
				await expect(positionBeforeRerender.y).toBeCloseTo(initialRect.y + 50, 0);
			});

			await fireEvent.click(await canvas.findByTestId('change-view'));

			const currentDraggable = await canvas.findByTestId('draggable-box');
			const positionAfterDrag = currentDraggable.getBoundingClientRect();

			await expect(positionAfterDrag.x).toBeCloseTo(positionBeforeRerender.x, 0);
			await expect(positionAfterDrag.y).toBeCloseTo(positionBeforeRerender.y, 0);
		});

		await step("should maintain position but keep element within bounds if it's size changes", async () => {
			const handle = await canvas.findByTestId('drag-handle');
			const draggable = await canvas.findByTestId('draggable-box');

			// wait for bounding box to emit the initial resize event
			await waitFor(() => new Promise((resolve) => setTimeout(resolve, DEFAULT_BOUNDING_ELEMENT_OPTIONS.resizeDebounce)));

			const initialRect = draggable.getBoundingClientRect();

			await moveHelper(handle, { x: BOUNDING_SIZE - initialRect.width, y: BOUNDING_SIZE - initialRect.height });

			let positionBeforeRerender: DOMRect = new DOMRect(0, 0, 0, 0);
			await waitFor(async () => {
				positionBeforeRerender = draggable.getBoundingClientRect();
				await expect(positionBeforeRerender.x).toBeCloseTo(BOUNDING_SIZE - initialRect.width, 0);
				await expect(positionBeforeRerender.y).toBeCloseTo(BOUNDING_SIZE - initialRect.height, 0);
			});

			await fireEvent.click(await canvas.findByTestId('resize-box'));

			const currentDraggable = await canvas.findByTestId('draggable-box');
			await waitFor(async () => {
				const positionAfterDrag = currentDraggable.getBoundingClientRect();
				await expect(positionAfterDrag.x).toBeCloseTo(BOUNDING_SIZE - SECONDARY_DRAGGABLE_BOX_SIZE, 0);
				await expect(positionAfterDrag.y).toBeCloseTo(BOUNDING_SIZE - SECONDARY_DRAGGABLE_BOX_SIZE, 0);
			});
		});
	},
};

const getLorem = (size: number) => {
    /* Implementation Hidden */
};

// Mocked page with scrollable content and text
const MockedPage = () => {
    /* Implementation Hidden */
};

export const ScrollablePage: Story = {
	render: () => <MockedPage />,
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement.parentElement || canvasElement);

		await step('should not allow selecting text when dragging an element', async () => {
			const user = userEvent.setup({ delay: 0 });
			const handle = await canvas.findByTestId('drag-handle');
			const draggable = await canvas.findByTestId('draggable-box');

			await expect(handle).toBeInTheDocument();
			await expect(draggable).toBeInTheDocument();

			const handleRect = handle.getBoundingClientRect();
			// Grab the middle of the handle
			const startX = handleRect.left + handleRect.width / 2;
			const startY = handleRect.top + handleRect.height / 2;

			// Caveat: We use "user-select: none" to prevent text selection behind the widget
			// but when simulating mouse events with `userEvent`, the text selection is triggered
			// regardless of the "user-select: none" property
			// This most likely happens because the events are simulated and not a real mouse interaction
			// This means we cannot test the text behind the widget, but we can test if the text inside the handle was selected
			// During manual tests, either both texts (inside and behind the widget) are selected or neither is selected
			// So this test should cover the issue even though it's not a perfect solution
			await user.pointer([
				{
					target: handle,
					keys: '[MouseLeft>]',
					coords: {
						x: startX,
						y: startY,
					},
				},
				{
					// we need to set offset to trigger text selection
					// this is what makes testing difficult, as setting the offset and target to "document.documentElement"
					// always triggers text selection, regardless of the css styles
					offset: 0,
					pointerName: 'mouse',
					coords: {
						x: startX,
						y: -10,
					},
				},
				{
					keys: '[/MouseLeft]',
				},
			]);

			await expect(document.getSelection()?.toString()).toBe('');
		});
	},
};

```