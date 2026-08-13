## File: packages/ui-client/src/components/Page/PageHeader.tsx

```typescript
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useContext } from 'react';

import PageContext from './PageContext';
import PageHeaderNoShadow from './PageHeaderNoShadow';

type PageHeaderProps = {
	title: ReactNode;
	onClickBack?: () => void;
	borderBlockEndColor?: string;
} & ComponentPropsWithoutRef<typeof PageHeaderNoShadow>;

const PageHeader = ({ borderBlockEndColor, ...props }: PageHeaderProps) => {
    /* Implementation Hidden */
};

export default PageHeader;

```