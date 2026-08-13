## File: apps/meteor/client/views/marketplace/components/ScreenshotCarouselAnchor.tsx

```typescript
import type { AppScreenshot } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, Icon } from '@rocket.chat/fuselage';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ScreenshotCarousel from './ScreenshotCarousel';

export type ScreenshotCarouselAnchorProps = {
	screenshots: AppScreenshot[];
};

type voidFunction = () => void;

const ScreenshotCarouselAnchor = ({ screenshots }: ScreenshotCarouselAnchorProps) => {
    /* Implementation Hidden */
};

export default ScreenshotCarouselAnchor;

```