## File: packages/ui-voip/src/providers/MediaCallLogger.ts

```typescript
import type { IMediaSignalLogger } from '@rocket.chat/media-signaling';

export class MediaCallLogger implements IMediaSignalLogger {
	private isDebug: boolean;

	constructor() {
        /* Implementation Hidden */
    }

	log(...what: any[]): void {
        /* Implementation Hidden */
    }

	debug(...what: any[]): void {
        /* Implementation Hidden */
    }

	error(...what: any[]): void {
        /* Implementation Hidden */
    }

	warn(...what: any[]): void {
        /* Implementation Hidden */
    }
}

```