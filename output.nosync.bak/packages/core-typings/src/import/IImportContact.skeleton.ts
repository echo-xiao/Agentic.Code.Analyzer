## File: packages/core-typings/src/import/IImportContact.ts

```typescript
export interface IImportContact {
	importIds: string[];
	_id?: string;
	name?: string;
	phones?: string[];
	emails?: string[];
	contactManager?: string;
	customFields?: Record<string, string>;
}

```