## File: packages/core-typings/src/import/IImporterSelectionChannel.ts

```typescript
export interface IImporterSelectionChannel {
	channel_id: string;
	name: string | undefined;
	is_archived: boolean;
	do_import: boolean;
	is_private: boolean;
	creator: undefined;
	is_direct: boolean;
}

```