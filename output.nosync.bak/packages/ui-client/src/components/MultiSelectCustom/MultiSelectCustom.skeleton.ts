## File: packages/ui-client/src/components/MultiSelectCustom/MultiSelectCustom.tsx

```typescript
import type { Button } from '@rocket.chat/fuselage';
import { Box } from '@rocket.chat/fuselage';
import { useButtonPattern, useOutsideClick, useToggle } from '@rocket.chat/fuselage-hooks';
import type { Keys as IconNames } from '@rocket.chat/icons';
import type { ChangeEvent, ComponentPropsWithoutRef, RefObject } from 'react';
import { useCallback, useRef } from 'react';

import MultiSelectCustomAnchor from './MultiSelectCustomAnchor';
import MultiSelectCustomList from './MultiSelectCustomList';
import MultiSelectCustomListWrapper from './MultiSelectCustomListWrapper';

const isValidReference = (reference: RefObject<HTMLElement | null>, event: { target: Node | null }): boolean => {
    /* Implementation Hidden */
};

const onMouseEventPreventSideEffects = (e: MouseEvent): void => {
    /* Implementation Hidden */
};

export type OptionProp = {
	id: string;
	text: string;
	checked?: boolean;
	isGroupTitle?: boolean;
	icon?: { name: IconNames; color?: 'default' | 'danger' | 'warning' };
};

/**
 * @param dropdownOptions options available for the multiselect dropdown list
 * @param defaultTitle dropdown text before selecting any options (or all of them). For example: 'All rooms'
	@param selectedOptionsTitle dropdown text after clicking one or more options. For example: 'Rooms (3)'
 * @param selectedOptions array with clicked options. This is used in the useFilteredTypeRooms hook, to filter the Rooms' table, for example. This array joins all of the individual clicked options from all available MultiSelectCustom components in the page. It helps to create a union filter for all the selections.
 * @param setSelectedOptions part of an useState hook to set the previous selectedOptions
 * @param searchBarText optional text prop that creates a search bar inside the dropdown, when added.
 * @returns a React Component that should be used with a custom hook for filters, such as useFilteredTypeRooms.tsx.
 * Check out the following files, for examples:
 * 	useFilteredTypeRooms.tsx,
 * 	useFilteredVisibility.tsx,
 * 	RoomsTable.tsx
 */
type DropDownProps = {
	dropdownOptions: OptionProp[];
	defaultTitle: string;
	selectedOptionsTitle: string;
	selectedOptions: OptionProp[];
	setSelectedOptions: (roles: OptionProp[]) => void;
	searchBarText?: string;
} & ComponentPropsWithoutRef<typeof Button>;

export const MultiSelectCustom = ({
	dropdownOptions,
	defaultTitle,
	selectedOptionsTitle,
	selectedOptions,
	setSelectedOptions,
	searchBarText,
	...props
}: DropDownProps) => {
    /* Implementation Hidden */
};

```