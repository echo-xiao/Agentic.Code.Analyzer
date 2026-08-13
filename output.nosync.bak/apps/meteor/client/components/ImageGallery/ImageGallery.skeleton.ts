## File: apps/meteor/client/components/ImageGallery/ImageGallery.tsx

```typescript
import { FocusScope } from '@react-aria/focus';
import type { IUpload } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, ButtonGroup, IconButton, Palette, PaletteStyleTag, Throbber, spacing } from '@rocket.chat/fuselage';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Navigation, Zoom, Keyboard, A11y } from 'swiper/modules/index.mjs';
import type { SwiperClass, SwiperRef } from 'swiper/swiper-react';
import { Swiper, SwiperSlide } from 'swiper/swiper-react.mjs';

import 'swiper/swiper.css';
import 'swiper/modules/zoom.css';

import { usePreventPropagation } from '../../hooks/usePreventPropagation';

const swiperStyle = css`
	.swiper {
		width: 100%;
		height: 100%;
	}
	.swiper-container {
		position: absolute;
		z-index: 99;
		top: 0;

		overflow: hidden;

		width: 100%;
		height: 100%;

		background-color: var(--rcx-color-surface-overlay, rgba(0, 0, 0, 0.6));
	}

	.swiper-slide {
		padding: ${spacing('x144')} ${spacing('x60')} ${spacing('x96')};
	}

	.rcx-swiper-prev-button,
	.rcx-swiper-next-button {
		position: absolute;
		z-index: 10;
		top: 50%;

		cursor: pointer;
	}

	.rcx-swiper-prev-button.swiper-button-disabled,
	.rcx-swiper-next-button.swiper-button-disabled {
		cursor: auto;
		pointer-events: none;

		opacity: 0.35;
	}

	.rcx-swiper-prev-button.swiper-button-hidden,
	.rcx-swiper-next-button.swiper-button-hidden {
		cursor: auto;
		pointer-events: none;

		opacity: 0;
	}

	.rcx-swiper-prev-button,
	.swiper-rtl .rcx-swiper-next-button {
		right: auto;
		left: 10px;
	}

	.rcx-swiper-next-button,
	.swiper-rtl .rcx-swiper-prev-button {
		right: 10px;
		left: auto;
	}

	.rcx-lazy-preloader {
		position: absolute;
		z-index: -1;
		left: 50%;
		top: 50%;

		transform: translate(-50%, -50%);

		color: ${Palette.text['font-pure-white']};
	}

	.rcx-swiper-controls {
		position: absolute;
		top: 0;
		right: 0;
		padding: 10px;
		z-index: 2;

		width: 100%;
		display: flex;
		justify-content: flex-end;
		background-color: ${Palette.surface['surface-sidebar']};
	}
`;

export const ImageGallery = ({
	images,
	onClose,
	loadMore,
}: {
	images: Pick<IUpload, '_id' | 'path' | 'url' | 'description'>[];
	onClose: () => void;
	loadMore?: () => void;
}) => {
    /* Implementation Hidden */
};

```