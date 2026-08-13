## File: packages/ui-kit/src/blocks/LayoutBlockish.ts

```typescript
export type LayoutBlockish<Block> = Block & {
	appId?: string;
	blockId?: string;
};

```