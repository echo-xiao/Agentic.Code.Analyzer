## File: ee/packages/media-calls/src/server/injection.ts

```typescript
import type { IMediaCallCastDirector } from '../definition/IMediaCallCastDirector';
import type { IMediaCallServer } from '../definition/IMediaCallServer';
import { logger } from '../logger';

let castDirectorInstance: IMediaCallCastDirector | null = null;
let mediaCallServerInstance: IMediaCallServer | null = null;

export function setCastDirector(director: IMediaCallCastDirector): void {
    /* Implementation Hidden */
}

export function getCastDirector(): IMediaCallCastDirector {
    /* Implementation Hidden */
}

export function setMediaCallServer(server: IMediaCallServer): void {
    /* Implementation Hidden */
}

export function getMediaCallServer(): IMediaCallServer {
    /* Implementation Hidden */
}

```