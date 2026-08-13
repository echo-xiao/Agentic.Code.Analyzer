## File: apps/meteor/client/providers/ImageGalleryProvider.tsx

```typescript
import { type ReactNode, useEffect, useState } from 'react';

import { ImageGallery } from '../components/ImageGallery';
import { ImageGalleryContext } from '../contexts/ImageGalleryContext';
import ImageGalleryData from '../views/room/ImageGallery/ImageGalleryData';

export type ImageGalleryProviderProps = {
	children: ReactNode;
};

const ImageGalleryProvider = ({ children }: ImageGalleryProviderProps) => {
    /* Implementation Hidden */
};

export default ImageGalleryProvider;

```