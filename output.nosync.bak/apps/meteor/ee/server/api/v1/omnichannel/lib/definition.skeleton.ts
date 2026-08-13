## File: apps/meteor/ee/server/api/v1/omnichannel/lib/definition.ts

```typescript
export interface IPagination {
	offset: number;
	count: number;
	sort: Record<string, any>;
}

export interface IPaginatedResponse {
	count: number;
	offset: number;
	total: number;
}

```