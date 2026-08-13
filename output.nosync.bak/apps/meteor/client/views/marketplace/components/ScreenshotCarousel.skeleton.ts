## File: apps/meteor/client/views/marketplace/components/ScreenshotCarousel.tsx

```typescript
import type { AppScreenshot } from '@rocket.chat/core-typings';
import { Box, IconButton } from '@rocket.chat/fuselage';

export type ScreenshotCarouselProps = {
	AppScreenshots: Array<AppScreenshot>;
	setViewCarousel: (state: boolean) => void;
	handleNextSlide: () => void;
	handlePrevSlide: () => void;
	isFirstSlide: boolean;
	isLastSlide: boolean;
	currentSlideIndex: number;
};

const ScreenshotCarousel = ({
	AppScreenshots,
	setViewCarousel,
	handleNextSlide,
	handlePrevSlide,
	isFirstSlide,
	isLastSlide,
	currentSlideIndex,
}: ScreenshotCarouselProps) => {
    /* Implementation Hidden */
};

export default ScreenshotCarousel;

```