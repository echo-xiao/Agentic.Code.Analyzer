## File: apps/meteor/client/navbar/NavBarSettingsToolbar/UserMenu/KeyboardShortcutsModal.tsx

```typescript
import { Box, Divider } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';

type KeyCombo = {
	mac: readonly string[];
	other: readonly string[];
};

type ShortcutDefinition = {
	id: string;
	descriptionKey: string;
	combos: readonly KeyCombo[];
};

const SHORTCUTS: readonly ShortcutDefinition[] = [
	{
		id: 'openKeyboardShortcuts',
		descriptionKey: 'Keyboard_Shortcuts_Show_Keyboard_Shortcuts',
		combos: [{ mac: ['Shift', '?'], other: ['Shift', '?'] }],
	},
	{
		id: 'openSearch',
		descriptionKey: 'Keyboard_Shortcuts_Open_Channel_Slash_User_Search',
		combos: [
			{ mac: ['Command', 'P'], other: ['Control', 'P'] },
			{ mac: ['Command', 'K'], other: ['Control', 'K'] },
		],
	},
	{
		id: 'markAllAsRead',
		descriptionKey: 'Keyboard_Shortcuts_Mark_all_as_read',
		combos: [{ mac: ['Shift', 'Escape'], other: ['Control', 'Escape'] }],
	},
	{
		id: 'editPreviousMessage',
		descriptionKey: 'Keyboard_Shortcuts_Edit_Previous_Message',
		combos: [{ mac: ['ArrowUp'], other: ['ArrowUp'] }],
	},
	{
		id: 'moveToBeginningHorizontal',
		descriptionKey: 'Keyboard_Shortcuts_Move_To_Beginning_Of_Message',
		combos: [{ mac: ['Command', 'ArrowLeft'], other: ['Alt', 'ArrowLeft'] }],
	},
	{
		id: 'moveToBeginningVertical',
		descriptionKey: 'Keyboard_Shortcuts_Move_To_Beginning_Of_Message',
		combos: [{ mac: ['Command', 'ArrowUp'], other: ['Alt', 'ArrowUp'] }],
	},
	{
		id: 'moveToEndHorizontal',
		descriptionKey: 'Keyboard_Shortcuts_Move_To_End_Of_Message',
		combos: [{ mac: ['Command', 'ArrowRight'], other: ['Alt', 'ArrowRight'] }],
	},
	{
		id: 'moveToEndVertical',
		descriptionKey: 'Keyboard_Shortcuts_Move_To_End_Of_Message',
		combos: [{ mac: ['Command', 'ArrowDown'], other: ['Alt', 'ArrowDown'] }],
	},
	{
		id: 'newLine',
		descriptionKey: 'Keyboard_Shortcuts_New_Line_In_Message',
		combos: [{ mac: ['Shift', 'Enter'], other: ['Shift', 'Enter'] }],
	},
];

const KEY_LABEL_TRANSLATIONS: Record<string, string> = {
	Command: 'Keyboard_Shortcut_Key_Command',
	Control: 'Keyboard_Shortcut_Key_Control',
	Option: 'Keyboard_Shortcut_Key_Option',
	Alt: 'Keyboard_Shortcut_Key_Alt',
	Shift: 'Keyboard_Shortcut_Key_Shift',
	Enter: 'Keyboard_Shortcut_Key_Enter',
	Escape: 'Keyboard_Shortcut_Key_Escape',
	ArrowUp: 'Keyboard_Shortcut_Key_ArrowUp',
	ArrowDown: 'Keyboard_Shortcut_Key_ArrowDown',
	ArrowLeft: 'Keyboard_Shortcut_Key_ArrowLeft',
	ArrowRight: 'Keyboard_Shortcut_Key_ArrowRight',
};

const isMacPlatform = (): boolean =>
	typeof navigator !== 'undefined' && typeof navigator.platform === 'string' && navigator.platform.toLowerCase().includes('mac');

export type KeyboardShortcutsModalProps = {
	onClose: () => void;
};

const KeyboardShortcutsModal = ({ onClose }: KeyboardShortcutsModalProps) => {
    /* Implementation Hidden */
};

export default memo(KeyboardShortcutsModal);

```