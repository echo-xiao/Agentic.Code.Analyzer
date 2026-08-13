## File: packages/ui-voip/src/components/Widget/WidgetHeader.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { VisuallyHidden } from 'react-aria';
import { useTranslation } from 'react-i18next';

type WidgetHeaderProps = {
	title: ReactNode;
	children: ReactNode;
};

// TODO: A11Y - duration/title
const WidgetHeader = ({ title, children }: WidgetHeaderProps) => {
    /* Implementation Hidden */
};
export default WidgetHeader;

```