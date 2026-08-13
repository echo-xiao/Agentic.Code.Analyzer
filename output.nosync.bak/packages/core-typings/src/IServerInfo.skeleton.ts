## File: packages/core-typings/src/IServerInfo.ts

```typescript
export interface IServerInfo {
	build: {
		arch: string;
		cpus: number;
		date: string;
		freeMemory: number;
		nodeVersion: string;
		osRelease: string;
		platform: string;
		totalMemory: number;
	};
	commit: {
		author?: string;
		branch?: string;
		date?: string;
		hash?: string;
		subject?: string;
		tag?: string;
	};
	marketplaceApiVersion: string;
	version: string;
}

```