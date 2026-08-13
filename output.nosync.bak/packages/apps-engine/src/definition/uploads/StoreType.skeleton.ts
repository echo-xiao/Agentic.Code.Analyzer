## File: packages/apps-engine/src/definition/uploads/StoreType.ts

```typescript
export enum StoreType {
	GridFS = 'GridFS:Uploads',
	AmazonS3 = 'AmazonS3',
	GoogleCloudStorage = 'GoogleCloudStorage',
	Webdav = 'Webdav',
	FileSystem = 'FileSystem',
}

```