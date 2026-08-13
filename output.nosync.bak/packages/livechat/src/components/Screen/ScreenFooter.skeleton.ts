## File: packages/livechat/src/components/Screen/ScreenFooter.tsx

```typescript
import { type ComponentChildren } from 'preact';
import { useContext } from 'preact/hooks';

import { Footer, FooterContent, PoweredBy } from '../Footer';
import { ScreenContext } from './ScreenProvider';

export type ScreenFooterProps = {
	children?: ComponentChildren;
	options?: ComponentChildren;
	limit?: ComponentChildren;
};

const ScreenFooter = ({ children, options, limit }: ScreenFooterProps) => {
    /* Implementation Hidden */
};

export default ScreenFooter;

```