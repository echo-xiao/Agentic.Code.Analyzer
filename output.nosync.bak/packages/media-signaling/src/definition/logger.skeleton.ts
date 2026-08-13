## File: packages/media-signaling/src/definition/logger.ts

```typescript
export interface IMediaSignalLogger {
	log(...what: any[]): void;
	debug(...what: any[]): void;
	error(...what: any[]): void;
	warn(...what: any[]): void;
}

```