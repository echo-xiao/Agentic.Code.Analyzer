## File: apps/meteor/client/lib/download.ts

```typescript
export const download = (href: string, filename: string): void => {
    /* Implementation Hidden */
};

const hasMsSaveOrOpenBlob = (navigator: Navigator): navigator is Navigator & { msSaveOrOpenBlob: (blob: Blob) => void } =>
	'msSaveOrOpenBlob' in navigator;

export const downloadAs = ({ data, ...options }: { data: BlobPart[] } & BlobPropertyBag, filename: string): void => {
    /* Implementation Hidden */
};

export const downloadJsonAs = (jsonObject: unknown, basename: string): void => {
    /* Implementation Hidden */
};

export const downloadCsvAs = (csvData: readonly (readonly unknown[])[], basename: string): void => {
    /* Implementation Hidden */
};

```