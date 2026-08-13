## File: apps/meteor/client/views/composer/EmojiPicker/EmojiPickerDesktopDropdown.tsx

```typescript
import { Box, Tile } from '@rocket.chat/fuselage';
import { useMergedRefs, usePosition } from '@rocket.chat/fuselage-hooks';
import type { ReactNode, Ref, RefObject } from 'react';
import { useMemo, useRef, forwardRef } from 'react';

const getDropdownContainer = (descendant: HTMLElement | null) => {
    /* Implementation Hidden */
};

const useDropdownPosition = (reference: RefObject<HTMLElement | null>, target: RefObject<HTMLElement | null>) => {
    /* Implementation Hidden */
};

export type EmojiPickerDesktopDropdownProps = {
	children: ReactNode;
	reference: RefObject<HTMLElement | null>;
};

/**
 * @reference is the trigger element target
 * @ref is the dropdown element target
 *  */
const EmojiPickerDesktopDropdown = forwardRef(function ToolboxDropdownDesktop(
	{ reference, children }: EmojiPickerDesktopDropdownProps,
	ref: Ref<HTMLElement>,
) {
	const targetRef = useRef<HTMLElement>(null);
	const mergedRef = useMergedRefs(ref, targetRef);

	const style = useDropdownPosition(reference, targetRef);

	return (
		<Tile style={style} ref={mergedRef} elevation='2' pi='0' pb='0' display='flex' flexDirection='column' overflow='auto'>
			<Box flexShrink={1} pb={12}>
				{children}
			</Box>
		</Tile>
	);
});

export default EmojiPickerDesktopDropdown;

```