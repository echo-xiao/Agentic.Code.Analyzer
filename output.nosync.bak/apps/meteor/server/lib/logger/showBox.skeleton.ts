## File: apps/meteor/server/lib/logger/showBox.ts

```typescript
import { createColors } from 'colorette';

import { lrpad } from '../../../lib/utils/stringUtils';

// force enable colors on dev env
const colors = createColors({
	useColor: process.env.NODE_ENV !== 'production',
});

type LogColors = 'white' | 'blue' | 'green' | 'magenta' | 'red';

function showBox(title: string, message: string, color?: LogColors): void {
    /* Implementation Hidden */
}

export function showErrorBox(title: string, message: string): void {
    /* Implementation Hidden */
}

export function showSuccessBox(title: string, message: string): void {
    /* Implementation Hidden */
}

export function showWarningBox(title: string, message: string): void {
    /* Implementation Hidden */
}

```