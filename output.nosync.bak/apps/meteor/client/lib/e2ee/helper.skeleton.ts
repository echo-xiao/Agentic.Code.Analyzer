## File: apps/meteor/client/lib/e2ee/helper.ts

```typescript
export async function encryptAESCTR(counter: BufferSource, key: CryptoKey, data: BufferSource) {
    /* Implementation Hidden */
}

export function generateAESCTRKey(): Promise<CryptoKey> {
    /* Implementation Hidden */
}

/**
 * Generates 12 uniformly random words from the word list.
 *
 * @remarks
 * Uses {@link https://en.wikipedia.org/wiki/Rejection_sampling | rejection sampling} to ensure uniform distribution.
 *
 * @returns A space-separated passphrase.
 */
export async function generatePassphrase() {
    /* Implementation Hidden */
}

export async function createSha256HashFromText(data: string) {
    /* Implementation Hidden */
}

export async function sha256HashFromArrayBuffer(arrayBuffer: ArrayBuffer) {
    /* Implementation Hidden */
}

```