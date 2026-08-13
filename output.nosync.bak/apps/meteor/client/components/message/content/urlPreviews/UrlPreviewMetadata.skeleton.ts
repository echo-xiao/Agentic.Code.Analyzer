## File: apps/meteor/client/components/message/content/urlPreviews/UrlPreviewMetadata.tsx

```typescript
export type UrlPreviewMetadata = {
	type: 'image' | 'video' | 'audio';
	originalType: string;
	url: string;
};

```