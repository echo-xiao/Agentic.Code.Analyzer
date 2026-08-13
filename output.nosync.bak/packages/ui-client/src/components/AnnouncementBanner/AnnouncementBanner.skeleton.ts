## File: packages/ui-client/src/components/AnnouncementBanner/AnnouncementBanner.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Palette } from '@rocket.chat/fuselage';
import type { AllHTMLAttributes, ReactNode, MouseEvent } from 'react';

type AnnouncementBannerProps = {
	children: ReactNode;
	onClick?: (e: MouseEvent) => void;
} & Omit<AllHTMLAttributes<HTMLButtonElement>, 'is'>;

const AnnouncementBanner = ({ children, className, onClick, ...props }: AnnouncementBannerProps) => {
    /* Implementation Hidden */
};

export default AnnouncementBanner;

```