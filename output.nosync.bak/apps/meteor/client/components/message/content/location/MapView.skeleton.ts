## File: apps/meteor/client/components/message/content/location/MapView.tsx

```typescript
import { useSetting } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import MapViewFallback from './MapViewFallback';
import MapViewImage from './MapViewImage';
import { useAsyncImage } from './hooks/useAsyncImage';

export type MapViewProps = {
	latitude: number;
	longitude: number;
};

const MapView = ({ latitude, longitude }: MapViewProps) => {
    /* Implementation Hidden */
};

export default memo(MapView);

```