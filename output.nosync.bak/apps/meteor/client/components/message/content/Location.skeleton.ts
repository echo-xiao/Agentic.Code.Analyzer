## File: apps/meteor/client/components/message/content/Location.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

import MapView from './location/MapView';

export type LocationProps = {
	location?: IMessage['location'];
};

const Location = ({ location }: LocationProps) => {
    /* Implementation Hidden */
};

export default Location;

```