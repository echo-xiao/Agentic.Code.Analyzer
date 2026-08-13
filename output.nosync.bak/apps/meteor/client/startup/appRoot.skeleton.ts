## File: apps/meteor/client/startup/appRoot.tsx

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppRoot from '../views/root/AppRoot';

const createContainer = (): Element => {
    /* Implementation Hidden */
};

const container = createContainer();

const root = createRoot(container);

root.render(
	<StrictMode>
		<AppRoot />
	</StrictMode>,
);

```