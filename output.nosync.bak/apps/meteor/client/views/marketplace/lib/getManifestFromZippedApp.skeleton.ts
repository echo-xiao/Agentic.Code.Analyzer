## File: apps/meteor/client/views/marketplace/lib/getManifestFromZippedApp.ts

```typescript
import type { AppPermission } from '@rocket.chat/core-typings';
import { unzipSync, strFromU8 } from 'fflate';

type Uint8ArrayObject = { [fileName: string]: Uint8Array };
type AppManifestSchema = { id: string; name: string; permissions: AppPermission[] };

async function fileToUint8Array(file: File): Promise<Uint8Array> {
    /* Implementation Hidden */
}

function unzipAppBuffer(zippedAppBuffer: Uint8Array): Uint8ArrayObject {
    /* Implementation Hidden */
}

function getAppManifest(unzippedAppBuffer: Uint8ArrayObject): AppManifestSchema {
    /* Implementation Hidden */
}

async function unzipZippedApp(zippedApp: File | Uint8Array): Promise<Uint8ArrayObject> {
    /* Implementation Hidden */
}

export async function getManifestFromZippedApp(zippedApp: File): Promise<AppManifestSchema> {
    /* Implementation Hidden */
}

```