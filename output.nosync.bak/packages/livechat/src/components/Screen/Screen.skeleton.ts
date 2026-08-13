## File: packages/livechat/src/components/Screen/Screen.tsx

```typescript
import { useContext } from 'preact/hooks';

import { createClassName } from '../../helpers/createClassName';
import CloseIcon from '../../icons/close.svg';
import { Button } from '../Button';
import { PopoverContainer } from '../Popover';
import { Sound } from '../Sound';
import { ChatButton } from './ChatButton';
import CssVar from './CssVar';
import ScreenHeader from './Header';
import { ScreenContext } from './ScreenProvider';
import styles from './styles.scss';

export type ScreenProps = {
	title: string;
	color?: string;
	agent?: any;
	children?: any;
	className?: string;
	unread?: number;
	triggered?: boolean;
	queueInfo?: any;
	onSoundStop?: () => void;
	ref?: any; // FIXME: remove this
};

const Screen = ({ title, color, agent, children, className, unread, triggered = false, queueInfo, onSoundStop }: ScreenProps) => {
    /* Implementation Hidden */
};

export default Screen;

```