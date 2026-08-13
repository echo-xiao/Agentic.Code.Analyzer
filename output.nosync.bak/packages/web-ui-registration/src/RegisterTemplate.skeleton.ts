## File: packages/web-ui-registration/src/RegisterTemplate.tsx

```typescript
import { useSetting } from '@rocket.chat/ui-contexts';
import type { AllHTMLAttributes, ReactNode } from 'react';

import HorizontalTemplate from './template/HorizontalTemplate';
import VerticalTemplate from './template/VerticalTemplate';

type RegisterTemplateProps = {
	children: ReactNode;
} & AllHTMLAttributes<HTMLElement>;

const RegisterTemplate = ({ children, ...props }: RegisterTemplateProps) => {
    /* Implementation Hidden */
};

export default RegisterTemplate;

```